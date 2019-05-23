const math = require('mathjs');
const _ = require('lodash');
const Utils={
    /**
     * Merge the stations and points in an array of scopes
     */
    createScopes:(stations,points)=>{
        const scopes=[];
        stations.forEach((station, i) => {
            points.forEach((point)=>{
                scopes.push({
                    "a":station,
                    "b":point
                })
            });
        });
        return _.uniq(scopes);
    },
    /**
     * Calculates the distance
     */
    calculateDistance:(scope)=>{
       return math.eval('sqrt((a.x - b.x)^2 + (a.y - b.y)^2)',scope) ;
    },
    /**
     * Caculates the power
     */
    calculatePower:(scope)=> {
        if (scope.distance > scope.reach) return 0;
        return math.eval('(reach-distance) ^2',scope);
    },
    /**
     * processes the scopes
     */
    processScopes:(scopes)=>{
        scopes.forEach((scope,i)=>{
            console.log(`row: ${i}`)
            const distance = Utils.calculateDistance(scope);
            console.log(`distance: ${distance}`);
            const power = Utils.calculatePower({
                distance: distance,
                 reach: scope.a.r
            });
            console.log(`power: ${power}`);
            const messageScope = _.assignIn({ 'power': power }, scope);
            console.log(`data: ${JSON.stringify(messageScope)}`);
            const messages = Utils.getMessage(messageScope);
            console.log(messages);
            console.log(`-----------------`)
        });
    },
    getMessage:(scope)=>{
        switch(scope.power){
            case 0:
            return `No link station within reach for point ${scope.a.x},${scope.a.y}`;
            default:
            return `Best link station for point ${scope.a.x},${scope.a.y} is ${scope.b.x},${scope.b.y} with power ${scope.power}`;
        }
    }
};

module.exports=Utils;