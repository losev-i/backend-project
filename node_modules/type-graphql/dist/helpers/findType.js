"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnTypes_1 = require("./returnTypes");
const errors_1 = require("../errors");
function findType({ metadataKey, prototype, propertyKey, returnTypeFunc, typeOptions = {}, parameterIndex, }) {
    const options = Object.assign({}, typeOptions);
    let metadataDesignType;
    const reflectedType = Reflect.getMetadata(metadataKey, prototype, propertyKey);
    if (metadataKey === "design:paramtypes") {
        metadataDesignType = reflectedType[parameterIndex];
    }
    else {
        metadataDesignType = reflectedType;
    }
    if (!returnTypeFunc &&
        (!metadataDesignType || (metadataDesignType && returnTypes_1.bannedTypes.includes(metadataDesignType)))) {
        throw new errors_1.NoExplicitTypeError(prototype.constructor.name, propertyKey, parameterIndex);
    }
    if (metadataDesignType === Array) {
        options.array = true;
    }
    if (returnTypeFunc) {
        const getType = () => {
            if (Array.isArray(returnTypeFunc())) {
                options.array = true;
                return returnTypeFunc()[0];
            }
            return returnTypeFunc();
        };
        return {
            getType,
            typeOptions: options,
        };
    }
    else if (metadataDesignType) {
        return {
            getType: () => metadataDesignType,
            typeOptions: options,
        };
    }
    else {
        throw new errors_1.CannotDetermineTypeError(prototype.constructor.name, propertyKey, parameterIndex);
    }
}
exports.findType = findType;
