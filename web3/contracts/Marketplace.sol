// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Marketplace {
    struct Item {
        address seller;
        string title;
        string description;
        uint256 price;
        string image;
        address buyer;
        bool isItemSold;
        bool isItemSent;
        bool isItemReceived;
    }

    mapping(uint256 => Item) public items;

    uint256 public numberOfItems = 0;

    function listItem(address _seller, string memory _title, string memory _description, uint256 _price, string memory _image) public returns(uint256) {
        Item storage item = items[numberOfItems];

        item.seller = _seller;
        item.title = _title;
        item.description = _description;
        item.price = _price;
        item.image = _image;

        numberOfItems++;

        return numberOfItems - 1;    
    }

    function buyItem(uint256 _itemId) public payable {
        require(msg.value == items[_itemId].price, "Incorrect amount of ether sent.");
        require(items[_itemId].isItemSold == false, "Item has already been sold.");

        items[_itemId].buyer = msg.sender;
        items[_itemId].isItemSold = true;
    }

    function sendItem(uint256 _itemId) public {
        require(items[_itemId].seller == msg.sender, "Only the seller can send the item.");
        require(items[_itemId].isItemSold == true, "The item has not been sold yet.");
        require(items[_itemId].isItemSent == false, "The item has already been sent.");

        items[_itemId].isItemSent = true;
    }

    function receiveItem(uint256 _itemId) public {
        require(items[_itemId].buyer == msg.sender, "Only the buyer can receive the item.");
        require(items[_itemId].isItemSold == true, "The item has not been sold yet.");
        require(items[_itemId].isItemSent == true, "The item has not been sent yet.");
        require(items[_itemId].isItemReceived == false, "The item has already been received.");

        items[_itemId].isItemReceived = true;
        payable(items[_itemId].seller).transfer(items[_itemId].price);
    }

    function refundItem(uint256 _itemId) public {
        require(items[_itemId].buyer == msg.sender, "Only the buyer can issue a refund.");
        require(items[_itemId].isItemSold == true, "The item has not been sold yet.");
        require(items[_itemId].isItemSent == true, "The item has not been sent yet.");
        require(items[_itemId].isItemReceived == false, "The item has already been received.");

        items[_itemId].isItemSent = false;
        items[_itemId].isItemSold = false;
        payable(items[_itemId].buyer).transfer(items[_itemId].price);
    }

    function resetItem(uint256 _itemId) public {
        require(items[_itemId].seller == msg.sender, "Only the seller can issue a refund.");
        require(items[_itemId].isItemSold == false, "The item has already been sold.");
        require(items[_itemId].isItemSent == false, "The item has already been sent.");
        require(items[_itemId].isItemReceived == false, "The item has already been received.");

        items[_itemId].buyer = address(0);
    }

    function getItems() public view returns (Item[] memory) {
        Item[] memory allItems = new Item[](numberOfItems);

        // Populate allItems
        for(uint i = 0; i < numberOfItems; i++) {
            Item storage item = items[i];

            allItems[i] = item;
        }

        return allItems;
    }
}