function printReceipt(inputBarcodes){
	let receipt = '';
	let allItems = loadAllItems();
	let promotions = loadPromotions();
	let itemBarcode = definePromoteItem(allItems, promotions, inputBarcodes);
	let promoteStr = [];
	let normalStr = [];
	promoteStr = createPromoteObj(itemBarcode, allItems); 
	normalStr = createNormalObj(itemBarcode, allItems);
	receipt += promoteStr[2];
	receipt += normalStr[3];
	receipt += normalStr[2];
	receipt += '-----------------------------------' + '\n';
	let totalPrice = (promoteStr[0] +  normalStr[0] +  normalStr[1]).toFixed(2);
	receipt += 'Total Price: ' + totalPrice + ' dollars' + '\n';
	receipt += 'Saved: ' +  promoteStr[1] + ' dollars' + '\n';
	receipt += '***********************************' + '\n';
	return receipt;
}

function definePromoteItem(allItems, promotions, inputBarcodes){
	let itemBarcode = [];
	for (let index=0; index<inputBarcodes.length;index++){
		if(promotions[0].barcodes.includes(inputBarcodes[index]))
			itemBarcode.push({'barcode': inputBarcodes[index],'isPromo' : true});
		else 
			itemBarcode.push({'barcode': inputBarcodes[index],'isPromo' : false});
	}
	return itemBarcode;
}

function createPromoteObj(itemBarcode, loadAllItems){
	let promoteItemObj = [];
	let promoteStr = '';
	let totalPrice;
	let promoteSavingStr = [];
	promoteItemObj = loadAllItems.filter( a => {
		for(let index=0; index<itemBarcode.length;index++)
			if(itemBarcode[index].barcode===a.barcode && itemBarcode[index].isPromo === true){
				return true;
			} 
		return false;
	});
	return getPromoteStr(promoteItemObj, itemBarcode);
}

function getPromoteStr(promoteItemObj, itemBarcode){
	let promoteSavingStr = '';
	let countPromoteItemObj = [];
	let saved = 0;
	let total = 0;
	let promoteSavingArray = [];
	for (let index = 0; index<promoteItemObj.length; index++){
		let count = 0;
		for (let counter=0; counter<itemBarcode.length; counter++){
			if (promoteItemObj[index].barcode === itemBarcode[counter].barcode)
				count++;
		}
		if (count >= 3){
			saved += count/3 * promoteItemObj[index].price;
			total += (count-count/3) * promoteItemObj[index].price;
		}else{
			saved = 0;
			total += count * promoteItemObj[index].price;
		}
		let secondLastChar = promoteItemObj[index].unit.charAt(promoteItemObj[index].unit.length-2);
		if (count === 1)
			promoteSavingStr += 'Name: ' + promoteItemObj[index].name + ', number: ' + count + ' ' + promoteItemObj[index].unit + ', price: ' + promoteItemObj[index].price.toFixed(2) + '. Total: ' + (count>=3?(promoteItemObj[index].price * (count-count/3)).toFixed(2):promoteItemObj[index].price*count).toFixed(2) + ' dollars.\n';
		else if (secondLastChar === 'a' || secondLastChar === 'e' || secondLastChar === 'i' || secondLastChar === 'o' || secondLastChar === 'u'){
			promoteSavingStr += 'Name: ' + promoteItemObj[index].name + ', number: ' + count + ' ' + promoteItemObj[index].unit + 'es, price: ' + promoteItemObj[index].price.toFixed(2) + '. Total: ' + (count>=3?(promoteItemObj[index].price * (count-count/3)).toFixed(2):promoteItemObj[index].price*count).toFixed(2) + ' dollars.\n';
			console.log(promoteItemObj[index].unit);
		}else
			promoteSavingStr += 'Name: ' + promoteItemObj[index].name + ', number: ' + count + ' ' + promoteItemObj[index].unit + 's, price: ' + promoteItemObj[index].price.toFixed(2) + '. Total: ' + (count>=3?(promoteItemObj[index].price * (count-count/3)).toFixed(2):promoteItemObj[index].price*count).toFixed(2) + ' dollars.\n';
		}
	promoteSavingArray[0] = total;
	promoteSavingArray[1] = saved;
	promoteSavingArray[2] = promoteSavingStr;
	return promoteSavingArray;
}

function createNormalObj(itemBarcode, loadAllItems){
	let normalWeightedStr = '';
	let normalObjArray = [];
	let noPromoteItemObj = [];
	loadAllItems.filter( a => {
		for(let index=0; index<itemBarcode.length;index++)
			if(itemBarcode[index].barcode===a.barcode || itemBarcode[index].barcode.split('-')[0]===a.barcode) 
				if(itemBarcode[index].isPromo === false){
					a.barcode = itemBarcode[index].barcode;
					if (!noPromoteItemObj.includes(a))
						noPromoteItemObj.push(a);
				}
		return false;
	});
	WeightedObj = findWeighted(noPromoteItemObj,true);
	normalObj = findWeighted(noPromoteItemObj,false);
	normalObjArray[0] = getWeightedStr(WeightedObj, true, itemBarcode);
	normalObjArray[1] = getNormalStr(normalObj, true, itemBarcode);
	normalObjArray[2] = getWeightedStr(WeightedObj, false, itemBarcode);
	normalObjArray[3] = getNormalStr(normalObj, false, itemBarcode);
	
	return normalObjArray;
}

function findWeighted(noPromoteItemObj, findWeighted){
	let WeightedObj = [];
	let normalObj = [];
	if (findWeighted) {	
		WeightedObj = noPromoteItemObj.filter( a => {
			return a.barcode.includes('-');
		});
		return WeightedObj;
	}else{
		normalObj = noPromoteItemObj.filter( a => {
			return !a.barcode.includes('-');
		});
		return normalObj;
	}
}

function getWeightedStr(WeightedObj, getTotal, itemBarcode){
	let weightedItemStr = '';
	let total = 0;
	for (let index=0; index<WeightedObj.length; index++){
		let count = parseFloat(WeightedObj[index].barcode.split('-')[1]);
		total += WeightedObj[index].price * count;
		weightedItemStr += 'Name: ' + WeightedObj[index].name + ', number: ' + count + ' ' + WeightedObj[index].unit + ', price: ' + WeightedObj[index].price.toFixed(2) + '. Total: ' + (WeightedObj[index].price * count).toFixed(2) + ' dollars.\n';
		}
	if (getTotal)
		return total;
	else
		return weightedItemStr;
}

function getNormalStr(normalObj, getTotal, itemBarcode){
	let normalItemStr = '';
	let total = 0;
	for (let index=0; index<normalObj.length; index++){
		let count = 0;
		for (let counter=0; counter<itemBarcode.length; counter++){
			if (normalObj[index].barcode === itemBarcode[counter].barcode)
				count++;
		}
		total += normalObj[index].price * count;
		let secondLastChar = normalObj[index].unit.charAt(normalObj[index].unit.length-2);
		if (count === 1)
			normalItemStr += 'Name: ' + normalObj[index].name + ', number: ' + count + ' ' + normalObj[index].unit + ', price: ' + normalObj[index].price.toFixed(2) + '. Total: ' + (normalObj[index].price * count).toFixed(2) + ' dollars.\n';
		else if (secondLastChar === 'a' || secondLastChar === 'e' || secondLastChar === 'i' || secondLastChar === 'o' || secondLastChar === 'u')
			normalItemStr += 'Name: ' + normalObj[index].name + ', number: ' + count + ' ' + normalObj[index].unit + 'es, price: ' + normalObj[index].price.toFixed(2) + '. Total: ' + (normalObj[index].price * count).toFixed(2) + ' dollars.\n';
		else
			normalItemStr += 'Name: ' + normalObj[index].name + ', number: ' + count + ' ' + normalObj[index].unit + 's, price: ' + normalObj[index].price.toFixed(2) + '. Total: ' + (normalObj[index].price * count).toFixed(2) + ' dollars.\n';
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