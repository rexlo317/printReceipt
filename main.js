function printReceipt(inputBarcodes){
	let receipt = '';
	let allItems = loadAllItems();
	let promotions = loadPromotions();
	let itemBarcode = definePromoteItem(allItems, promotions, inputBarcodes);
	receipt += createPromoteObj(itemBarcode, allItems, false, false);
	receipt += createNormalObj(itemBarcode, allItems, false, true, false, false);
	receipt += createNormalObj(itemBarcode, allItems, true, false, false, false);
	receipt += '**************************************' + '\n';
	receipt += 'Total Price: ' + createPromoteObj(itemBarcode, allItems, false, true) + createNormalObj(itemBarcode, allItems, false, false, true, false) + createNormalObj(itemBarcode, allItems, false, false, false, true) + ' dollars' + '\n';
	receipt += 'Saved: ' +  createNormalObj(itemBarcode, allItems, false, false, true, false) + '\n';
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

function createPromoteObj(itemBarcode, loadAllItems, findSaving, getTotal){
	let promoteItemObj = [];
	let promoteStr = '';
	let savingStr = '';
	let totalPrice;
	promoteItemObj = loadAllItems.filter( a => {
		for(let index=0; index<itemBarcode.length;index++)
			if(itemBarcode[index].barcode===a && itemBarcode[index].isPromo === true)
				return true;
			else 
				return false;
	});
	if (findSaving)
		return getPromoteStr(promoteItemObj, findSaving, getTotal);
	else if (getTotal)
		return getPromoteStr(promoteItemObj, findSaving, getTotal);
	else	
		return promoteSavingStr;
}

function getPromoteStr(promoteItemObj, findSaving, getTotal){
	let promoteSavingStr = '';
	let countPromoteItemObj = [];
	let saved = 0;
	let total = 0;
	for (let index; index<promoteItemObj.length; index++){
		let count = 0;
		for (let counter; counter<promoteItemObj.length; counter++){
			if (promoteItemObj[count] === promoteItemObj[counter])
				count++;
		}
		if (count / 3 >== 1){
			saved += count/3 * promoteItemObj[index].price;
			total += (count-count/3) * promoteItemObj[index].price;
		}else{
			saved = 0;
			total += count * promoteItemObj[index].price;
		}
		promoteSavingStr += 'Name: ' + promoteItemObj[index].name + ', number: ' + count + ' ' + promoteItemObj[index].unit + ', price: ' + promoteItemObj[index].price + '. Total: ' + promoteItemObj[index].price * (count-count/3) ' dollar.\n';
	}
	if (getTotal)
		return total;
	if (findSaving)
		return saved;
	else
		return promoteSavingStr;
}

function createNormalObj(itemBarcode, loadAllItems, getWeightedStr, getNormalStr, getWeightedTotal, getNormalTotal){
	let normalWeightedStr = '';
	noPromoteItemObj = loadAllItems.filter( a => {
		for(let index=0; index<itemBarcode.length;index++)
			if((itemBarcode[index].barcode===a || itemBarcode[index].barcode.split('-')[0]===a) && itemBarcode[index].isPromo === false)
				return true;
			else 
				return false;
	});
	WeightedObj = findWeighted(noPromoteItemObj,true);
	normalObj = findWeighted(noPromoteItemObj,false);
	if (getWeightedStr)
		return getWeightedStr(WeightedObj, getWeightedTotal);
	else if (getNormalStr)
		return getNormalStr(normalObj, getNormalTotal
	else if (getWeightedTotal)
		return getWeightedStr(WeightedObj, getWeightedTotal);
	else if (getNormalTotal)
		return getNormalStr(normalObj, getNormalTotal);
}

function findWeighted(noPromoteItemObj, findWeighted){
	let WeightedObj = [];
	let normalObj = [];
	if (findWeighted) {	
		WeightedObj = noPromoteItemObj.filter( a => {
			a.barcode.contains('-');
		});
		return WeightedObj;
	}else{
		normalObj = noPromoteItemObj.filter( a => {
			!a.barcode.contains('-');
		}
		return normalObj;
	}
}

function getWeightedStr(WeightedObj, getTotal){
	let weightedItemStr = '';
	for (let index; index<WeightedObj.length; index++){
		let count = WeightedObj[index].split('-')[1];
		total += WeightedObj[index].price * count;
		weightedItemStr += 'Name: ' + WeightedObj[index].name + ', number: ' + count + ' ' + WeightedObj[index].unit + ', price: ' + WeightedObj[index].price + '. Total: ' + WeightedObj[index].price * count ' dollar.\n';
	}
	if (getTotal)
		return total;
	else
		return weightedItemStr;
}

function getNormalStr(normalObj, getTotal){
	let normalItemStr = '';
	let total = 0;
	for (let index; index<normalObj.length; index++){
		let count = 0;
		for (let counter; counter<normalObj.length; counter++){
			if (normalObj[count] === normalObj[counter])
				count++;
		}
		total += normalObj[index].price * count;
		normalItemStr += 'Name: ' + normalObj[index].name + ', number: ' + count + ' ' + normalObj[index].unit + ', price: ' + normalObj[index].price + '. Total: ' + normalObj[index].price * count ' dollar.\n';
	}
	if (getTotal)
		return total;
	else
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

module.exports = printReceipt;