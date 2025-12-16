import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../src/user/entities/user.schema';
import { Movie } from '../src/movies/entities/movie.entity';
import { TVShow } from '../src/tvshows/entities/tvshow.entity';
import { MyListItem, ContentType } from '../src/mylist/entities/mylist.entity';
import { Genre } from '../src/common/enums/genre.enum';

describe('MylistController (e2e)', () => {
    let app: INestApplication;
    let userModel: Model<User>;
    let movieModel: Model<Movie>;
    let tvShowModel: Model<TVShow>;
    let myListItemModel: Model<MyListItem>;

    let user: any;
    let movie: any;
    let tvShow: any;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
        movieModel = moduleFixture.get<Model<Movie>>(getModelToken(Movie.name));
        tvShowModel = moduleFixture.get<Model<TVShow>>(getModelToken(TVShow.name));
        myListItemModel = moduleFixture.get<Model<MyListItem>>(getModelToken(MyListItem.name));
    });

    beforeEach(async () => {
        // Clear collections
        await myListItemModel.deleteMany({});
        await userModel.deleteMany({});
        await movieModel.deleteMany({});
        await tvShowModel.deleteMany({});

        // Seed basic data
        user = await userModel.create({
            username: 'testuser',
            preferences: { favoriteGenres: [], dislikedGenres: [] },
        });

        movie = await movieModel.create({
            title: 'Test Movie',
            description: 'Test Description',
            genres: [Genre.Action],
            releaseDate: new Date(),
            director: 'Test Director',
        });

        tvShow = await tvShowModel.create({
            title: 'Test TV Show',
            description: 'Test Description',
            genres: [Genre.Comedy],
            episodes: [],
        });
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/mylist (POST)', () => {
        it('should add a movie to the list', async () => {
            const response = await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: user._id.toString(),
                    contentId: movie._id.toString(),
                    priority: 1,
                    notes: 'Must watch',
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.contentId).toBe(movie._id.toString());
            expect(response.body.data.contentType).toBe(ContentType.Movie);
            expect(response.body.data.title).toBe(movie.title);
        });

        it('should add a TV show to the list', async () => {
            const response = await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: user._id.toString(),
                    contentId: tvShow._id.toString(),
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.contentId).toBe(tvShow._id.toString());
            expect(response.body.data.contentType).toBe(ContentType.TVShow);
            expect(response.body.data.title).toBe(tvShow.title);
        });

        it('should fail if item already exists', async () => {
            await myListItemModel.create({
                userId: user._id,
                contentId: movie._id,
                contentType: ContentType.Movie,
                addedAt: new Date(),
            });

            await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: user._id.toString(),
                    contentId: movie._id.toString(),
                })
                .expect(409);
        });

        it('should fail if content does not exist', async () => {
            await request(app.getHttpServer())
                .post('/mylist')
                .send({
                    userId: user._id.toString(),
                    contentId: '5f9d7a3b9d3e2a1b3c4d5e6f', // Random valid ObjectId
                })
                .expect(404);
        });
    });

    describe('/mylist (GET)', () => {
        beforeEach(async () => {
            await myListItemModel.create({
                userId: user._id,
                contentId: movie._id,
                contentType: ContentType.Movie,
                addedAt: new Date(),
                priority: 2
            });

            await myListItemModel.create({
                userId: user._id,
                contentId: tvShow._id,
                contentType: ContentType.TVShow,
                addedAt: new Date(),
                priority: 1
            });
        });

        it('should get user list', async () => {
            const response = await request(app.getHttpServer())
                .get('/mylist')
                .query({ userId: user._id.toString() })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(2);
            // Check flattening effect
            expect(response.body.data[0].title).toBeDefined();
            expect(response.body.data[0].description).toBeDefined();
            expect(response.body.data[0].genres).toBeDefined();
        });

        it('should filter by contentType', async () => {
            const response = await request(app.getHttpServer())
                .get('/mylist')
                .query({
                    userId: user._id.toString(),
                    contentType: ContentType.Movie
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0].contentType).toBe(ContentType.Movie);
        });
    });

    describe('/mylist/:itemId (DELETE)', () => {
        let listItem: any;

        beforeEach(async () => {
            listItem = await myListItemModel.create({
                userId: user._id,
                contentId: movie._id,
                contentType: ContentType.Movie,
                addedAt: new Date(),
            });
        });

        it('should remove an item from the list', async () => {
            await request(app.getHttpServer())
                .delete(`/mylist/${listItem._id}`)
                .query({ userId: user._id.toString() })
                .expect(200);

            const check = await myListItemModel.findById(listItem._id);
            expect(check).toBeNull();
        });

        it('should return 404 if item not found', async () => {
            await request(app.getHttpServer())
                .delete(`/mylist/5f9d7a3b9d3e2a1b3c4d5e6f`)
                .query({ userId: user._id.toString() })
                .expect(404);
        });
    });
});
