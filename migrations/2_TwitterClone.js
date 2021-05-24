const TwitterClone= artifacts.require("TwitterClone.sol");

module.exports = function(deployer, network){
    return deployer
        .then(() => {
            console.log("Starting deploying TwitterClone on " + network);
            return deployer.deploy(TwitterClone);
        })
        .then( () => {
            console.log("TwitterClone successfully deployed")
        });
    
};