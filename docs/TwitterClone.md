## `TwitterClone`





### `ownerOf(uint256 _tweetId)`



A modifier function to check that only the owner of the tweet can call the function and returns an error otherwise 



### `createTweet(string _tweetText)` (public)



A function that creates a new Tweet given the text


### `readTweet(uint256 _tweetId) → address owner, string tweetText` (public)



A function that returns a Tweet information (owner and text). If the tweet was deleted it returns a warning.


### `editTweet(uint256 _tweetId, string _newText)` (external)



A function that edits a Tweet text with a new text. Only Tweet owner can edit a tweet.


### `deleteTweet(uint256 _tweetId)` (external)



A function that mark a Tweet as deleted. Only Tweet owner can edit a tweet.


### `getTweetsLength() → uint256 count` (public)



A getter function to access the length of the tweets List.

### `getTweetsByOwner(address _owner) → uint256[]` (external)



A function that returns the list of tweets for a specific owner.



### `NewTweet(uint256 tweetId, string tweetText, address owner)`





