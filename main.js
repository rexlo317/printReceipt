function printReceipt(inputBarcodes){
	let receipt = '';
	let allItems = loadAllItems();
	let promotions = loadPromotions();
	
	return receipt
}

function definePromoteItem(allItems, promotions, inputBarcodes){
	let itemBarcode;
	return itemBarcode;
}

function createPromoteObj(itemBarcode, loadAllItems){
	let promoteItemObj;
	let promoteSavingStr = '';
	return promoteSavingStr;
}

function getPromoteStr(promoteItemObj){
	let promoteSavingStr = '';
	return promoteSavingStr;
}

function createNormalObj(itemBarcode, loadAllItems){
	let normalWeightedStr = '';
	return normalWeightedStr;
}

function findWeighted(noPromoteItemObj){
	return normalAndWeightedObj;
}

function getWeightedStr(normalAndWeightedObj){
	let weightedItemStr = '';
	return weightedItemStr;
}

function getNormalStr(normalAndWeightedObj){
	let normalItemStr = '';
	return normalItemStr;
}

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      unit: 'kg',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      unit: 'kg',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      unit: 'box',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}