// "SPDX-License-Identifier: MIT"

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TwitterClone is Ownable {
    event NewTweet(uint256 tweetId, string tweetText);

    struct Tweet{
        string tweetText;
        bool deleted;
    }
    Tweet[] public tweets;

    /**
    * @dev A function that creates a new Tweet given the text
    * @param _tweetText The text of the tweet to be created
     */
    function createTweet(string memory _tweetText) public {
        tweets.push(Tweet(_tweetText, false));
        uint256 tweetId = tweets.length -1;
        emit NewTweet(tweetId, _tweetText);
    }

    /**
    * @dev A function that edits a Tweet text with a new text. Only Tweet owner can edit a tweet.
    * @param _tweet The tweet to be edited
    * @param _newText The new text for the Tweet after edition
     */
    function editTweet(Tweet memory _tweet, string memory _newText) external view onlyOwner {
        _tweet.tweetText = _newText;
    }

    /**
    * @dev A function that mark a Tweet as deleted. Only Tweet owner can edit a tweet.
    * @param _tweet The tweet to be deleted
     */

    function deleteTweet(Tweet memory _tweet) external view onlyOwner {
        _tweet.deleted = true;
    }

    function getTweetsLength() public view returns(uint count) {
        return tweets.length;
    }

}