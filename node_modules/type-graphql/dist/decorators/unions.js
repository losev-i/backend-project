"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function createUnionType({ name, description, types: classTypes, resolveType, }) {
    const unionMetadataSymbol = getMetadataStorage_1.getMetadataStorage().collectUnionMetadata({
        name,
        description,
        classTypes,
        resolveType,
    });
    return unionMetadataSymbol;
}
exports.createUnionType = createUnionType;
