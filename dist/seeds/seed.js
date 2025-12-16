"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/entities/user.schema");
const movie_entity_1 = require("../movies/entities/movie.entity");
const tvshow_entity_1 = require("../tvshows/entities/tvshow.entity");
const mylist_entity_1 = require("../mylist/entities/mylist.entity");
const genre_enum_1 = require("../common/enums/genre.enum");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    const movieModel = app.get((0, mongoose_1.getModelToken)(movie_entity_1.Movie.name));
    const tvShowModel = app.get((0, mongoose_1.getModelToken)(tvshow_entity_1.TVShow.name));
    const myListItemModel = app.get((0, mongoose_1.getModelToken)(mylist_entity_1.MyListItem.name));
    console.log('🌱 Starting database seed...\n');
    console.log('🗑️  Clearing existing collections...');
    await userModel.deleteMany({});
    await movieModel.deleteMany({});
    await tvShowModel.deleteMany({});
    await myListItemModel.deleteMany({});
    console.log('✅ Collections cleared\n');
    console.log('🎬 Seeding movies...');
    const movies = await movieModel.insertMany([
        {
            title: 'The Matrix',
            description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
            genres: [genre_enum_1.Genre.SciFi, genre_enum_1.Genre.Action],
            releaseDate: new Date('1999-03-31'),
            director: 'The Wachowskis',
            actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
        },
        {
            title: 'Inception',
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
            genres: [genre_enum_1.Genre.SciFi, genre_enum_1.Genre.Action],
            releaseDate: new Date('2010-07-16'),
            director: 'Christopher Nolan',
            actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
        },
        {
            title: 'The Shawshank Redemption',
            description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            genres: [genre_enum_1.Genre.Drama],
            releaseDate: new Date('1994-09-23'),
            director: 'Frank Darabont',
            actors: ['Tim Robbins', 'Morgan Freeman'],
        },
        {
            title: 'The Dark Knight',
            description: 'When the menace known as the Joker emerges, he wreaks havoc and chaos on the people of Gotham.',
            genres: [genre_enum_1.Genre.Action, genre_enum_1.Genre.Drama],
            releaseDate: new Date('2008-07-18'),
            director: 'Christopher Nolan',
            actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
        },
        {
            title: 'Interstellar',
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            genres: [genre_enum_1.Genre.SciFi, genre_enum_1.Genre.Drama],
            releaseDate: new Date('2014-11-07'),
            director: 'Christopher Nolan',
            actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        },
        {
            title: 'The Conjuring',
            description: 'Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse.',
            genres: [genre_enum_1.Genre.Horror],
            releaseDate: new Date('2013-07-19'),
            director: 'James Wan',
            actors: ['Patrick Wilson', 'Vera Farmiga', 'Lili Taylor'],
        },
        {
            title: 'La La Land',
            description: 'A jazz pianist falls for an aspiring actress in Los Angeles.',
            genres: [genre_enum_1.Genre.Romance, genre_enum_1.Genre.Drama],
            releaseDate: new Date('2016-12-09'),
            director: 'Damien Chazelle',
            actors: ['Ryan Gosling', 'Emma Stone'],
        },
        {
            title: 'Superbad',
            description: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
            genres: [genre_enum_1.Genre.Comedy],
            releaseDate: new Date('2007-08-17'),
            director: 'Greg Mottola',
            actors: ['Jonah Hill', 'Michael Cera', 'Christopher Mintz-Plasse'],
        },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            description: 'A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring.',
            genres: [genre_enum_1.Genre.Fantasy, genre_enum_1.Genre.Action],
            releaseDate: new Date('2001-12-19'),
            director: 'Peter Jackson',
            actors: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
        },
        {
            title: 'Pulp Fiction',
            description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
            genres: [genre_enum_1.Genre.Drama, genre_enum_1.Genre.Action],
            releaseDate: new Date('1994-10-14'),
            director: 'Quentin Tarantino',
            actors: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        },
    ]);
    console.log(`✅ Created ${movies.length} movies\n`);
    console.log('📺 Seeding TV shows...');
    const tvShows = await tvShowModel.insertMany([
        {
            title: 'Breaking Bad',
            description: 'A high school chemistry teacher turned methamphetamine producer partners with a former student.',
            genres: [genre_enum_1.Genre.Drama],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: new Date('2008-01-20'),
                    director: 'Vince Gilligan',
                    actors: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
                },
                {
                    episodeNumber: 2,
                    seasonNumber: 1,
                    releaseDate: new Date('2008-01-27'),
                    director: 'Vince Gilligan',
                    actors: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
                },
                {
                    episodeNumber: 3,
                    seasonNumber: 1,
                    releaseDate: new Date('2008-02-10'),
                    director: 'Vince Gilligan',
                    actors: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
                },
            ],
        },
        {
            title: 'Stranger Things',
            description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
            genres: [genre_enum_1.Genre.SciFi, genre_enum_1.Genre.Horror, genre_enum_1.Genre.Drama],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: new Date('2016-07-15'),
                    director: 'The Duffer Brothers',
                    actors: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
                },
                {
                    episodeNumber: 2,
                    seasonNumber: 1,
                    releaseDate: new Date('2016-07-15'),
                    director: 'The Duffer Brothers',
                    actors: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
                },
            ],
        },
        {
            title: 'The Office',
            description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.',
            genres: [genre_enum_1.Genre.Comedy],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: new Date('2005-03-24'),
                    director: 'Greg Daniels',
                    actors: ['Steve Carell', 'Rainn Wilson', 'John Krasinski'],
                },
                {
                    episodeNumber: 2,
                    seasonNumber: 1,
                    releaseDate: new Date('2005-03-29'),
                    director: 'Greg Daniels',
                    actors: ['Steve Carell', 'Rainn Wilson', 'John Krasinski'],
                },
            ],
        },
        {
            title: 'Game of Thrones',
            description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.',
            genres: [genre_enum_1.Genre.Fantasy, genre_enum_1.Genre.Drama, genre_enum_1.Genre.Action],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: new Date('2011-04-17'),
                    director: 'David Benioff',
                    actors: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
                },
                {
                    episodeNumber: 2,
                    seasonNumber: 1,
                    releaseDate: new Date('2011-04-24'),
                    director: 'David Benioff',
                    actors: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
                },
            ],
        },
        {
            title: 'The Haunting of Hill House',
            description: 'Flashing between past and present, a fractured family confronts haunting memories of their old home.',
            genres: [genre_enum_1.Genre.Horror, genre_enum_1.Genre.Drama],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: new Date('2018-10-12'),
                    director: 'Mike Flanagan',
                    actors: ['Michiel Huisman', 'Carla Gugino', 'Henry Thomas'],
                },
            ],
        },
    ]);
    console.log(`✅ Created ${tvShows.length} TV shows\n`);
    console.log('👥 Seeding users...');
    const users = await userModel.insertMany([
        {
            username: 'john_doe',
            preferences: {
                favoriteGenres: [genre_enum_1.Genre.Action, genre_enum_1.Genre.SciFi],
                dislikedGenres: [genre_enum_1.Genre.Horror],
            },
            watchHistory: [
                {
                    contentId: movies[0]._id.toString(),
                    watchedOn: new Date('2024-11-15'),
                    rating: 5,
                },
                {
                    contentId: movies[1]._id.toString(),
                    watchedOn: new Date('2024-11-20'),
                    rating: 5,
                },
                {
                    contentId: tvShows[0]._id.toString(),
                    watchedOn: new Date('2024-12-01'),
                    rating: 4,
                },
            ],
        },
        {
            username: 'jane_smith',
            preferences: {
                favoriteGenres: [genre_enum_1.Genre.Drama, genre_enum_1.Genre.Romance],
                dislikedGenres: [genre_enum_1.Genre.Horror, genre_enum_1.Genre.SciFi],
            },
            watchHistory: [
                {
                    contentId: movies[2]._id.toString(),
                    watchedOn: new Date('2024-10-10'),
                    rating: 5,
                },
                {
                    contentId: movies[6]._id.toString(),
                    watchedOn: new Date('2024-11-25'),
                    rating: 4,
                },
                {
                    contentId: tvShows[0]._id.toString(),
                    watchedOn: new Date('2024-12-05'),
                    rating: 5,
                },
            ],
        },
        {
            username: 'mike_horror_fan',
            preferences: {
                favoriteGenres: [genre_enum_1.Genre.Horror, genre_enum_1.Genre.SciFi],
                dislikedGenres: [genre_enum_1.Genre.Romance],
            },
            watchHistory: [
                {
                    contentId: movies[5]._id.toString(),
                    watchedOn: new Date('2024-11-01'),
                    rating: 5,
                },
                {
                    contentId: tvShows[1]._id.toString(),
                    watchedOn: new Date('2024-11-10'),
                    rating: 4,
                },
                {
                    contentId: tvShows[4]._id.toString(),
                    watchedOn: new Date('2024-12-10'),
                    rating: 5,
                },
            ],
        },
        {
            username: 'comedy_lover',
            preferences: {
                favoriteGenres: [genre_enum_1.Genre.Comedy],
                dislikedGenres: [genre_enum_1.Genre.Horror, genre_enum_1.Genre.Drama],
            },
            watchHistory: [
                {
                    contentId: movies[7]._id.toString(),
                    watchedOn: new Date('2024-12-12'),
                    rating: 5,
                },
                {
                    contentId: tvShows[2]._id.toString(),
                    watchedOn: new Date('2024-12-14'),
                    rating: 5,
                },
            ],
        },
        {
            username: 'fantasy_explorer',
            preferences: {
                favoriteGenres: [genre_enum_1.Genre.Fantasy, genre_enum_1.Genre.Action],
                dislikedGenres: [],
            },
            watchHistory: [
                {
                    contentId: movies[8]._id.toString(),
                    watchedOn: new Date('2024-09-01'),
                    rating: 5,
                },
                {
                    contentId: tvShows[3]._id.toString(),
                    watchedOn: new Date('2024-10-15'),
                    rating: 4,
                },
                {
                    contentId: movies[3]._id.toString(),
                    watchedOn: new Date('2024-11-30'),
                    rating: 5,
                },
            ],
        },
    ]);
    console.log(`✅ Created ${users.length} users\n`);
    console.log('📋 Seeding user list items...');
    const myListItems = await myListItemModel.insertMany([
        {
            userId: users[0]._id,
            contentId: movies[4]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-12-01'),
            notes: 'Must watch this weekend!',
            priority: 5,
        },
        {
            userId: users[0]._id,
            contentId: movies[3]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-11-28'),
            priority: 4,
        },
        {
            userId: users[0]._id,
            contentId: tvShows[1]._id,
            contentType: mylist_entity_1.ContentType.TVShow,
            addedAt: new Date('2024-12-05'),
            notes: 'Season 2 next',
            priority: 3,
        },
        {
            userId: users[1]._id,
            contentId: movies[9]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-12-10'),
            priority: 5,
        },
        {
            userId: users[1]._id,
            contentId: tvShows[3]._id,
            contentType: mylist_entity_1.ContentType.TVShow,
            addedAt: new Date('2024-12-08'),
            notes: 'Heard great things about this',
            priority: 4,
        },
        {
            userId: users[2]._id,
            contentId: movies[0]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-12-15'),
            notes: 'Need to rewatch',
        },
        {
            userId: users[2]._id,
            contentId: tvShows[0]._id,
            contentType: mylist_entity_1.ContentType.TVShow,
            addedAt: new Date('2024-12-12'),
            priority: 5,
        },
        {
            userId: users[3]._id,
            contentId: movies[1]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-12-13'),
            notes: 'Friends recommended',
            priority: 3,
        },
        {
            userId: users[3]._id,
            contentId: movies[8]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-12-14'),
            priority: 2,
        },
        {
            userId: users[4]._id,
            contentId: movies[4]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-12-16'),
            notes: 'Nolan masterpiece',
            priority: 5,
        },
        {
            userId: users[4]._id,
            contentId: tvShows[2]._id,
            contentType: mylist_entity_1.ContentType.TVShow,
            addedAt: new Date('2024-12-15'),
            notes: 'Need something light',
            priority: 2,
        },
        {
            userId: users[4]._id,
            contentId: movies[5]._id,
            contentType: mylist_entity_1.ContentType.Movie,
            addedAt: new Date('2024-12-10'),
            priority: 1,
        },
    ]);
    console.log(`✅ Created ${myListItems.length} list items\n`);
    console.log('📊 Seed Summary:');
    console.log(`   Movies: ${movies.length}`);
    console.log(`   TV Shows: ${tvShows.length}`);
    console.log(`   Users: ${users.length}`);
    console.log(`   MyList Items: ${myListItems.length}`);
    console.log('\n✨ Database seeding completed successfully!\n');
    await app.close();
    process.exit(0);
}
bootstrap().catch((err) => {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map