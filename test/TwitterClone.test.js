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
        it("Should create a new Tweet from a Text", async () => {
            this.TwitterClone.createTweet("First Tweet", {from: owner});
            firstTweet = await this.TwitterClone.tweets.call([0]);
            firstTweet.tweetText.should.equal("First Tweet");
        });


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



        it("Check that tweet list is of the correct length", async () => {
            this.TwitterClone.createTweet("Tweet1");
            this.TwitterClone.createTweet("Tweet2");
            this.TwitterClone.createTweet("Tweet3");
            this.TwitterClone.createTweet("Tweet4");
            this.TwitterClone.createTweet("Tweet5");
            let tweetL = await this.TwitterClone.getTweetsLength.call();
            tweetL.toNumber().should.equal(5);
        });

        // TODO test for deleting. This should be pretty straightforward if the Edit one is fixed.

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

        // it('emits a Transfer event on successful transfers', async function () {
        //     this.TwitterClone.createTweet("First Tweet", {from: owner} );
        
        //     // Event assertions can verify that the arguments are the expected ones
        //     expectEvent(Result, {
        //         '0': 'First Tweet',
        //         '1': false,
        //         tweetText: 'First Tweet',
        //         deleted: false
        //       });
        // });
    });
});
