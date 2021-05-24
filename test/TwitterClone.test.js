require("chai").should();

const TwitterClone = artifacts.require("TwitterClone");
const truffleAssert = require("truffle-assertions");

contract("TwitterClone", (accounts) => {
    let owner = accounts[0];
    let nonOwner = accounts[1];

    beforeEach(async() => {
        this.TwitterClone = await TwitterClone.new();
    });

    describe("Creating Tweet", () => {
        it("Should create a new Tweet from a Text", async () => {
            // console.log(this.TwitterClone.tweets)
            this.TwitterClone.createTweet("First Tweet");
            // console.log(this.TwitterClone.tweets.length);
            firstTweet = await this.TwitterClone.tweets.call([0]);
            // console.log(firstTweet);
            firstTweet.tweetText.should.equal("First Tweet");
        });
    });

    // Test is not working as the tweet created doesn't take the "owner" parameter. To be invesigated.
    describe("Owner editing his own Tweet", () => {
        it("Should edit a Tweet text when the requester is the owner of the Tweet", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner} );
            console.log(this.TwitterClone.getTweetsLength);
            firstTweet = await this.TwitterClone.tweets.call([0]);
            // console.log(firstTweet);
            try {
                this.TwitterClone.editTweet(firstTweet, "EDITED First Tweet", {from: owner});
                editedTweet = await this.TwitterClone.tweets.call([0]);
                // console.log(editedTweet);
                editedTweet.tweetText.should.equal("EDITED First Tweet");
            } catch (e) {
                console.log(`${owner} is not the owner`)
                editedTweet = await this.TwitterClone.tweets.call([0]);
                editedTweet.tweetText.should.equal("EDITED First Tweet");
                // console.log(editedTweet);
                
            }
            
        });
    });

    describe("Other user trying to edit a Tweet he didn't create", () => {
        it("Should throw an error as modifier is not the owner of the Tweet", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner} );
            console.log(this.TwitterClone.tweets.length);
            firstTweet = await this.TwitterClone.tweets.call([0]);
            console.log(firstTweet);
            await truffleAssert.reverts(
                this.TwitterClone.editTweet(firstTweet, "EDITED First Tweet", {from: nonOwner}),
                "VM Exception while processing transaction: revert"
            );
        });
    });

        // TODO test for deleting. This should be pretty straightforward if the Edit one is fixed.

});