"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MylistModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mylist_service_1 = require("./mylist.service");
const mylist_controller_1 = require("./mylist.controller");
const mylist_entity_1 = require("./entities/mylist.entity");
const content_module_1 = require("../content/content.module");
let MylistModule = class MylistModule {
};
exports.MylistModule = MylistModule;
exports.MylistModule = MylistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: mylist_entity_1.MyListItem.name, schema: mylist_entity_1.MyListItemSchema },
            ]),
            content_module_1.ContentModule,
        ],
        controllers: [mylist_controller_1.MylistController],
        providers: [mylist_service_1.MylistService],
    })
], MylistModule);
//# sourceMappingURL=mylist.module.js.map