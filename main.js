function printReceipt(inputBarcodes){
	let receipt = '';
	let allItems = loadAllItems();
	let promotions = loadPromotions();
	definePromoteItem(allItems, promotions, inputBarcodes);
	return receipt;
}

function definePromoteItem(allItems, promotions, inputBarcodes){
	let itemBarcode = [];
	for (let index=0; index<inputBarcodes.length;index++){
		if(promotions.barcodes.includes(inputBarcodes(index)))
			itemBarcode.push({'barcode': inputBarcodes[index],'isPromo' : true});
		else
			itemBarcode.push({'barcode': inputBarcodes[index],'isPromo' : false});
	}
	});
	return itemBarcode;
}

function createPromoteObj(itemBarcode, loadAllItems){
	let promoteItemObj;
	let promoteSavingStr = '';
	promoteItemObj = loadAllItems.filter( a => {
		for(let index=0; index<itemBarcode.length;index++)
			if(itemBarcode[index].barcode===a && itemBarcode[index].isPromo === true)
				return true;
			else 
				return false;
	});
	promoteSavingStr = getPromoteStr(promoteItemObj);
	return promoteSavingStr;
}

function getPromoteStr(promoteItemObj){
	let promoteSavingStr = '';
	return promoteSavingStr;
}

function createNormalObj(itemBarcode, loadAllItems){
	let normalWeightedStr = '';
	noPromoteItemObj = loadAllItems.filter( a => {
		for(let index=0; index<itemBarcode.length;index++)
			if(itemBarcode[index].barcode===a && itemBarcode[index].isPromo === false)
				return true;
			else 
				return false;
	});
	normalAndWeightedObj = findWeighted(noPromoteItemObj,true);
	return normalWeightedStr;
}

function findWeighted(noPromoteItemObj, findWeighted){
	
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