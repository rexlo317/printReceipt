const check = require('../main');

it ('should be null', () => {
    expect(check(['ITEM000000','ITEM000001','ITEM000001','ITEM000002-2','ITEM000003-3','ITEM000004','ITEM000004','ITEM000004','ITEM000005']))
		.toBe('Name: Coca-Cola, number: 1 bottle, price: 3.00. Total: 3.00 dollar.' + '\n'
			+ 'Name: Sprite, number: 2 bottle, price: 3.00. Total: 6.00 dollar.'+ '\n'
			+ 'Name: Noodles, number: 1 bag, price: 4.50. Total: 4.50 dollar.'+ '\n'
			+ 'Name: Battery, number: 3 box, price: 2.00. Total: 6.00 dollar.'+ '\n'
			+ 'Name: Apple, number: 2 kg, price: 5.50. Total: 11.00 dollar.'+ '\n'
			+ 'Name: LitChi, number: 3 kg, price: 15.50. Total: 46.50 dollar.'+ '\n');
	});