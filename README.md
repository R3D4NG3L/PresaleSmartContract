> 📜 Presale Solidity Smart Contract

- [🤝 Need help for deployment?](#-need-help-for-deployment)
- [🔎 Purpose](#-purpose)
  - [TokenPreSale.sol](#tokenpresalesol)
  - [TestUSDT.sol & TestErc20Token.sol](#testusdtsol--testerc20tokensol)
  - [Features](#features)
- [🐉 Examples on BSC Testnet](#-examples-on-bsc-testnet)
  - [TokenPreSale.sol](#tokenpresalesol-1)
  - [TestUSDT.sol](#testusdtsol)
  - [TestErc20Token.sol](#testerc20tokensol)
- [💪 How to use it](#-how-to-use-it)
  - [How to create a new sale round](#how-to-create-a-new-sale-round)
  - [How to change sale round start and end time](#how-to-change-sale-round-start-and-end-time)
  - [How to change vesting start time](#how-to-change-vesting-start-time)
  - [How to change sale token address](#how-to-change-sale-token-address)
  - [How to change sale token price](#how-to-change-sale-token-price)
  - [How to enable / disable buy with Ethers functionality](#how-to-enable--disable-buy-with-ethers-functionality)
  - [How to enable / disable buy with USDT functionality](#how-to-enable--disable-buy-with-usdt-functionality)
  - [How to pause / unpause presale](#how-to-pause--unpause-presale)

# 🤝 Need help for deployment?
If you **need for deployment and use of this smart contract**, you can find my contacts on my GitHub profile page.
___If you contact me on Telegram, write as first message that you have found my contact on GitHub or you will automatically blocked___.

# 🔎 Purpose
## TokenPreSale.sol
This repository offers a smart contract to manage seed sales / pre-sales. It is written in Solidity for EVM blockchains (e.g. Ethereum, BSC, Cronos, ...).
## TestUSDT.sol & TestErc20Token.sol
This repository offers also other 2 bonus smart contracts to allow you to test TokenPreSale.sol on test nets 

## Features
- ✅ Manage a **pre-sale / seed sale**
- ✅ With only **one smart contract** is possible to **manage multiple sale rounds** for potentially multiple tokens
- ✅ **Configurable** sale round **start and end date time**
- ✅ **Configurable vesting start time, cliff and period**
- ✅ **Configurable number of tokens to be sold**
- ✅ Token claim is allowed only after the sale round is completed and can be configured also a cliff period (not mandatory) to allow claim in small portions over a certain period of time
- ✅ **Configurable token to be claimed**
- ✅ **It is not necessary to develop the token to be claimed before sale round starts**, this will give you more time to think about tokenomics and feature of your ERC20 token that will have to be developed.
- ✅ It is possible to **invest into the sale round with stable coins** such as USDT, USDC, etc... (requirement of 6 decimal digits per ERC20 token)
- ✅ It is possible to **invest into the sale round with Ethers** (it depends from which blockchain is deployed the smart contract, so it would be **ETH** for Ethereum Blockchain, **BNB** for Binance Smart Chain, CRO for **Cronos**, etc...)
- ✅ It is **possible to change parameters when the sale round has already started**

# 🐉 Examples on BSC Testnet
Deploy date: 19 November 2022

**⚠️ Those links might go down in the future if the BSC Testnet goes down or is wiped out**.

## TokenPreSale.sol
https://testnet.bscscan.com/address/0xbfBAde8310Db30F2E34C2aee1896001dD6B005f9

## TestUSDT.sol
https://testnet.bscscan.com/address/0x250df3426Facabb1a1AE0145ea2E86cdbb296fA7

## TestErc20Token.sol
https://testnet.bscscan.com/address/0x5d08C7eD211825518f1CD121c32B077aEE350954

# 💪 How to use it
## How to create a new sale round
The function that you'll have to call with the contract owner address is '*createPresale*'
```javascript
/**
 * @dev Creates a new presale
 * @param _startTime start time of the sale
 * @param _endTime end time of the sale
 * @param _price Per token price multiplied by (10**18)
 * @param _tokensToSell No of tokens to sell without denomination. If 1 million tokens to be sold then - 1_000_000 has to be passed
 * @param _baseDecimals No of decimals for the token. (10**18), for 18 decimal token
 * @param _vestingStartTime Start time for the vesting - UNIX timestamp
 * @param _vestingCliff Cliff period for vesting in seconds
 * @param _vestingPeriod Total vesting period(after vesting cliff) in seconds
 * @param _enableBuyWithEth Enable/Disable buy of tokens with ETH
 * @param _enableBuyWithUsdt Enable/Disable buy of tokens with USDT
 */
function createPresale(
    uint256 _startTime,
    uint256 _endTime,
    uint256 _price,
    uint256 _tokensToSell,
    uint256 _baseDecimals,
    uint256 _vestingStartTime,
    uint256 _vestingCliff,
    uint256 _vestingPeriod,
    uint256 _enableBuyWithEth,
    uint256 _enableBuyWithUsdt
)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
// _startTime = 1668360000 -> Sun Nov 13 2022 17:20:00 GMT+0000
// _endTime = 1680328800 -> Sat Apr 01 2023 06:00:00 GMT+0000
// _price = 18005041411595246 -> 0,018005041411595246$ per Token
// __tokensToSell = 10000000 -> 10 millions of tokens to be sold in this sale round
// _baseDecimals = 1000000000000000000 -> ERC20 Token to be sold number of decimals, in this case 18 decimals (10**18)
// _vestingStartTime: 1680328801 -> Sat Apr 01 2023 06:00:01 GMT+0000
// _vestingCliff: 0 -> No Cliff Period
// _vestingPeriod: 0 -> No vesting period
// _enableBuyWithEth: 0 -> Buy with Ethers functionality disabled
// _enableBuyWithUsdt: 1 -> Buy with USDT (stable coin) functionality enabled
instance.createPresale(1668360000, 1680328800, BigInt(18005041411595246), 10000000, BigInt(1000000000000000000), 1680328801, 0, 0, 0, 1)
```

## How to change sale round start and end time
```javascript
/**
 * @dev To update the sale times
 * @param _id Presale id to update
 * @param _startTime New start time
 * @param _endTime New end time
 */
function changeSaleTimes(
    uint256 _id,
    uint256 _startTime,
    uint256 _endTime
)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
let latestPresaleId = await instance.presaleId.call()
// _id = latestPresaleId or the preSaleId which you want to change
// _startTime = 1668360000 -> Sun Nov 13 2022 17:20:00 GMT+0000
// _endTime = 1680328800 -> Sat Apr 01 2023 06:00:00 GMT+0000
instance.changeSaleTimes(latestPresaleId, 1668360000, 1680328800)
```

## How to change vesting start time
```javascript
/**
 * @dev To update the vesting start time
 * @param _id Presale id to update
 * @param _vestingStartTime New vesting start time
 */
function changeVestingStartTime(uint256 _id, uint256 _vestingStartTime)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
let latestPresaleId = await instance.presaleId.call()
// _id = latestPresaleId or the preSaleId which you want to change
// _startTime = 1668360000 -> Sun Nov 13 2022 17:20:00 GMT+0000
instance.changeVestingStartTime(latestPresaleId, 1668360000)
```

## How to change sale token address
```javascript
/**
 * @dev To update the sale token address
 * @param _id Presale id to update
 * @param _newAddress Sale token address
 */
function changeSaleTokenAddress(uint256 _id, address _newAddress)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
let latestPresaleId = await instance.presaleId.call()
// _id = latestPresaleId or the preSaleId which you want to change
// _newAddress = 0xdc381eac30f839e9c9f614d31e6c71679b40fa10 -> ERC20 Token address
instance.changeSaleTokenAddress(latestPresaleId, "0xdc381eac30f839e9c9f614d31e6c71679b40fa10")
```

## How to change sale token price
```javascript
/**
 * @dev To update the price
 * @param _id Presale id to update
 * @param _newPrice New sale price of the token
 */
function changePrice(uint256 _id, uint256 _newPrice)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
let latestPresaleId = await instance.presaleId.call()
// _id = latestPresaleId or the preSaleId which you want to change
// _newPrice = 18005041411595246 -> 0,018005041411595246$ per Token
instance.changePrice(latestPresaleId, BigInt(18005041411595246))
```

## How to enable / disable buy with Ethers functionality
```javascript
/**
 * @dev To update possibility to buy with ETH
 * @param _id Presale id to update
 * @param _enableToBuyWithEth New value of enable to buy with ETH
 */
function changeEnableBuyWithEth(uint256 _id, uint256 _enableToBuyWithEth)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
let latestPresaleId = await instance.presaleId.call()
// _id = latestPresaleId or the preSaleId which you want to change
// _enableToBuyWithEth = 1 -> Enabled
instance.changeEnableBuyWithEth(latestPresaleId, 1)
```

## How to enable / disable buy with USDT functionality
```javascript
/**
 * @dev To update possibility to buy with Usdt
 * @param _id Presale id to update
 * @param _enableToBuyWithUsdt New value of enable to buy with Usdt
 */
function changeEnableBuyWithUsdt(uint256 _id, uint256 _enableToBuyWithUsdt)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
let latestPresaleId = await instance.presaleId.call()
// _id = latestPresaleId or the preSaleId which you want to change
// _enableToBuyWithUsdt = 0 -> Disabled
instance.changeEnableBuyWithUsdt(latestPresaleId, 0)
```

## How to pause / unpause presale
```javascript
/**
 * @dev To pause the presale
 * @param _id Presale id to update
 */
function pausePresale(uint256 _id)

/**
 * @dev To unpause the presale
 * @param _id Presale id to update
 */
function unPausePresale(uint256 _id)
```

Example (*truffle console*):
```typescript
let instance = await TokenSaleTest.deployed()
let latestPresaleId = await instance.presaleId.call()
// _id = latestPresaleId or the preSaleId which you want to change
instance.pausePresale(latestPresaleId)
// _id = latestPresaleId or the preSaleId which you want to change
instance.unPausePresale(latestPresaleId)
```

