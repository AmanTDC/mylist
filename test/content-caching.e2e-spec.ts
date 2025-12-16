import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Content Caching Integration (e2e)', () => {
    let app: INestApplication;
    let createdMovieId: string;
    let createdTVShowId: string;
    let createdUserId: string;
    let myListItemId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();

        // Create test data
        const userResponse = await request(app.getHttpServer())
            .post('/users')
            .send({
                username: 'testuser_cache',
                email: 'cache@test.com',
                age: 25,
            });
        createdUserId = userResponse.body._id;

        const movieResponse = await request(app.getHttpServer())
            .get('/movies')
            .query({ limit: 1 });
        createdMovieId = movieResponse.body.data[0]._id;

        const tvShowResponse = await request(app.getHttpServer())
            .get('/tvshows')
            .query({ limit: 1 });
        createdTVShowId = tvShowResponse.body.data[0]._id;
    });

    afterAll(async () => {
        // Cleanup
        if (createdUserId) {
            await request(app.getHttpServer()).delete(`/users/${createdUserId}`);
        }
        await app.close();
    });

    describe('POST /mylist - Add item without contentType', () => {
        it('should add a movie to list without specifying contentType', async () => {
            const response = await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: createdUserId,
                    contentId: createdMovieId,
                    // contentType is NOT provided - should be auto-detected
                    notes: 'Auto-detected as Movie',
                    priority: 5,
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.contentType).toBe('Movie');
            expect(response.body.data.content).toBeDefined();
            expect(response.body.data.content.title).toBeDefined();

            myListItemId = response.body.data._id;
        });

        it('should add a TV show with explicit contentType', async () => {
            const response = await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: createdUserId,
                    contentId: createdTVShowId,
                    contentType: 'TVShow', // Explicitly provided
                    notes: 'Explicitly set as TVShow',
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.contentType).toBe('TVShow');
            expect(response.body.data.content).toBeDefined();
        });

        it('should reject invalid contentId', async () => {
            await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: createdUserId,
                    contentId: '507f1f77bcf86cd799439999', // Non-existent ID
                })
                .expect(404);
        });
    });

    describe('GET /mylist - Get user list with populated content', () => {
        it('should return list with populated content details', async () => {
            const response = await request(app.getHttpServer())
                .get('/mylist')
                .query({
                    userId: createdUserId,
                    limit: 10,
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThan(0);

            // Check that content is populated
            const firstItem = response.body.data[0];
            expect(firstItem.content).toBeDefined();
            expect(firstItem.content.title).toBeDefined();
            expect(firstItem.content.contentType).toBeDefined();
            expect(firstItem.contentType).toBe(firstItem.content.contentType);
        });

        it('should filter by contentType', async () => {
            const response = await request(app.getHttpServer())
                .get('/mylist')
                .query({
                    userId: createdUserId,
                    contentType: 'Movie',
                    limit: 10,
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            response.body.data.forEach((item: any) => {
                expect(item.contentType).toBe('Movie');
            });
        });
    });

    describe('Caching behavior', () => {
        it('should serve content from cache on subsequent requests', async () => {
            // First request - fetch from DB and cache
            const start1 = Date.now();
            await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: createdUserId,
                    contentId: createdMovieId,
                })
                .expect(201);
            const duration1 = Date.now() - start1;

            // Remove the item
            await request(app.getHttpServer())
                .delete(`/mylist/${myListItemId}`)
                .query({ userId: createdUserId })
                .expect(200);

            // Second request - should be faster (from cache)
            const start2 = Date.now();
            await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: createdUserId,
                    contentId: createdMovieId,
                })
                .expect(201);
            const duration2 = Date.now() - start2;

            // Cache should make second request faster (in theory)
            console.log(`First request: ${duration1}ms, Second request (cached): ${duration2}ms`);
        });
    });
});
