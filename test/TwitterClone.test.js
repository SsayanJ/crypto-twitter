require("chai").should();

const TwitterClone = artifacts.require("TwitterClone");
const truffleAssert = require("truffle-assertions");
const {
    // BN,           // Big Number support
    // constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
    } = require('@openzeppelin/test-helpers');

contract("TwitterClone", (accounts) => {
    let owner = accounts[0];
    let nonOwner = accounts[1];

    beforeEach(async() => {
        this.TwitterClone = await TwitterClone.new();
    });

    describe("CryptoTwitter tests", () => {
        // This test checks that the createTweet function behaves as expected
        it("Should create a new Tweet from a Text", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner});
            firstTweet = await this.TwitterClone.tweets.call([0]);
            firstTweet.tweetText.should.equal("First Tweet");
        });

        // Next 2 tests check that the editTweet function behaves as expective
        it("Should edit a Tweet text when the requester is the owner of the Tweet", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner} );
            try {
                this.TwitterClone.editTweet(0, "EDITED First Tweet", {from: owner});
                editedTweet = await this.TwitterClone.tweets.call([0]);
                editedTweet.tweetText.should.equal("EDITED First Tweet");
            } catch (e) {
                console.log(`${owner} is not the owner`);                
            }            
        });


        it("Should throw an error as modifier is not the owner of the Tweet", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner} );
            try{
            await expectRevert(
                this.TwitterClone.editTweet(0, "EDITED First Tweet", {from: nonOwner}),
                "This action can only be performed by the owner of the tweet"
            );
            } catch (e){
                console.log(e)
            }
        });
   
        // Next test checks that calling 5 times the createTweet function indeed creates 5 Tweets in the tweets list
        it("Check that tweet list is of the correct length", async () => {
            this.TwitterClone.createTweet("Tweet1");
            this.TwitterClone.createTweet("Tweet2");
            this.TwitterClone.createTweet("Tweet3");
            this.TwitterClone.createTweet("Tweet4");
            this.TwitterClone.createTweet("Tweet5");
            let tweetL = await this.TwitterClone.getTweetsLength.call();
            tweetL.toNumber().should.equal(5);
        });

        // Next 2 tests check that the editTweet function behaves as expective
        it("Should set a Tweet delete attribute to true when the requester is the owner of the Tweet", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner} );
            try {
                this.TwitterClone.deleteTweet(0, {from: owner});
                editedTweet = await this.TwitterClone.tweets.call([0]);
                editedTweet.deleted.should.equal(true);
            } catch (e) {
                console.log(`${owner} is not the owner`);                
            }
        });   


        it("Should throw an error as deleter is not the owner of the Tweet", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner} );
            try{
            await expectRevert(
                this.TwitterClone.deleteTweet(0, {from: nonOwner}),
                "This action can only be performed by the owner of the tweet"
            );
            } catch (e){
                console.log(e)
            }
        });

        // Next test checks the getTweetsByOwner function behaviour.
        it('confirms getTweetsByOwner returns the proper list', async () => {
            this.TwitterClone.createTweet("Owner Tweet1", {from: owner} );
            this.TwitterClone.createTweet("Owner Tweet2", {from: owner} );
            this.TwitterClone.createTweet("Other tweet", {from: nonOwner} );
            this.TwitterClone.createTweet("Other tweet", {from: nonOwner} );
            this.TwitterClone.createTweet("Owner Tweet3", {from: owner} );
            this.TwitterClone.createTweet("Other tweet", {from: nonOwner} );
            this.TwitterClone.createTweet("Owner Tweet4", {from: owner} );
            
            ownerTweets = await this.TwitterClone.getTweetsByOwner(owner)
            ownerTweets.length.should.equal(4);
            lastTweet = await this.TwitterClone.tweets.call(ownerTweets[3]);
            lastTweet.tweetText.should.equal("Owner Tweet4");
        });
    });
});
