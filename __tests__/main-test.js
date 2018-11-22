const check = require('../main');

it ('should print receipt', () => {
    expect(check(['ITEM000000','ITEM000001','ITEM000001','ITEM000002-2','ITEM000003-3','ITEM000004','ITEM000004','ITEM000004','ITEM000005']))
		.toBe('Name: Coca-Cola, number: 1 bottle, price: 3.00. Total: 3.00 dollars.' + '\n'
			+ 'Name: Sprite, number: 2 bottles, price: 3.00. Total: 6.00 dollars.'+ '\n'
			+ 'Name: Noodles, number: 1 bag, price: 4.50. Total: 4.50 dollars.'+ '\n'
			+ 'Name: Battery, number: 3 boxes, price: 2.00. Total: 6.00 dollars.'+ '\n'
			+ 'Name: Apple, number: 2 kg, price: 5.50. Total: 11.00 dollars.'+ '\n'
			+ 'Name: Litchi, number: 3 kg, price: 15.00. Total: 45.00 dollars.'+ '\n'
			+ '-----------------------------------' + '\n'
			+ 'Total Price: 75.50 dollars' + '\n'
			+ 'Saved: 0 dollars' + '\n'
			+ '***********************************' + '\n');
	});