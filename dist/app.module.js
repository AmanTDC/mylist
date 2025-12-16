"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const movies_module_1 = require("./movies/movies.module");
const tvshows_module_1 = require("./tvshows/tvshows.module");
const common_module_1 = require("./common/common.module");
const mylist_module_1 = require("./mylist/mylist.module");
const user_module_1 = require("./user/user.module");
const mylist_entity_1 = require("./mylist/entities/mylist.entity");
const content_module_1 = require("./content/content.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: mylist_entity_1.MyListItem.name, schema: mylist_entity_1.MyListItemSchema },
            ]),
            movies_module_1.MoviesModule,
            tvshows_module_1.TvshowsModule,
            common_module_1.CommonModule,
            mylist_module_1.MylistModule,
            user_module_1.UserModule,
            content_module_1.ContentModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map