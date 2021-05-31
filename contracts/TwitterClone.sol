// "SPDX-License-Identifier: MIT"

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TwitterClone is Ownable {
    event NewTweet(uint256 tweetId, string tweetText, address owner);

    struct Tweet{
        string tweetText;
        bool deleted;
    }
    Tweet[] public tweets;
    mapping(uint256 => address) public tweetToOwner;
    mapping(address => uint256) ownerTweetCount;

    /**
    * @dev A modifier function to check that only the owner of the tweet can call the function and returns an error otherwise 
    * @param _tweetId The ID of the tweet to be modified by the function
     */
    modifier ownerOf(uint256 _tweetId){
        require(tweetToOwner[_tweetId] == msg.sender,
        "This action can only be performed by the owner of the tweet"
        );
        _;
    }


    /**
    * @dev A function that creates a new Tweet given the text
    * @param _tweetText The text of the tweet to be created
     */
    function createTweet(string memory _tweetText) public {
        tweets.push(Tweet(_tweetText, false));
        uint256 tweetId = tweets.length -1;
        tweetToOwner[tweetId] = msg.sender;
        ownerTweetCount[msg.sender]++;
        emit NewTweet(tweetId, _tweetText, msg.sender);
    }


    /**
    * @dev A function that returns a Tweet information (owner and text). If the tweet was deleted it returns a warning.
    * @param _tweetId The ID of the tweet to be read
     */
    function readTweet(uint256 _tweetId) public view returns(address owner, string memory tweetText) {
        Tweet memory t = tweets[_tweetId];
        require(t.deleted == false, "This tweet was deleted" );
        return (tweetToOwner[_tweetId], t.tweetText);
    }


    /**
    * @dev A function that edits a Tweet text with a new text. Only Tweet owner can edit a tweet.
    * @param _tweetId The ID of the tweet to be edited
    * @param _newText The new text for the Tweet after edition
     */
    function editTweet(uint256 _tweetId, string memory _newText) external ownerOf(_tweetId) {
        tweets[_tweetId].tweetText = _newText;
    }


    /**
    * @dev A function that mark a Tweet as deleted. Only Tweet owner can edit a tweet.
    * @param _tweetId The ID of the tweet to be deleted
     */
    function deleteTweet(uint256 _tweetId) external ownerOf(_tweetId) {
        tweets[_tweetId].deleted = true;
    }


    /**
    * @dev A getter function to access the length of the tweets List.
     */
    function getTweetsLength() public view returns(uint count) {
        return tweets.length;
    }


    /**
    * @dev A function that returns the list of tweets for a specific owner.
    * @param _owner the address of the owner for which the function returns the list of their tweets.
     */
    function getTweetsByOwner(address _owner) external view returns(uint[] memory) {
        uint256[] memory result = new uint256[](ownerTweetCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i< tweets.length; i++){
            if (tweetToOwner[i] == _owner){
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

}