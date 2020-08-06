/**
 * Internal dependencies
 */
import Currency from '../src';

describe( 'formatAmount', () => {
	it( 'should use defaults (USD) when currency not passed in', () => {
		const currency = Currency();
		expect( currency.formatAmount( 9.99 ) ).toBe( '$9.99' );
		expect( currency.formatAmount( 30 ) ).toBe( '$30.00' );
	} );

	it( 'should uses store currency settings, not locale-based', () => {
		const currency = Currency( {
			code: 'JPY',
			symbol: '¥',
			precision: 3,
			priceFormat: '%2$s%1$s',
			thousandSeparator: '.',
			decimalSeparator: ',',
		} );
		expect( currency.formatAmount( 9.49258 ) ).toBe( '9,493¥' );
		expect( currency.formatAmount( 3000 ) ).toBe( '3.000,000¥' );
		expect( currency.formatAmount( 3.0002 ) ).toBe( '3,000¥' );
	} );

	it( "should return empty string when given an input that isn't a number", () => {
		const currency = Currency();
		expect( currency.formatAmount( 'abc' ) ).toBe( '' );
		expect( currency.formatAmount( false ) ).toBe( '' );
		expect( currency.formatAmount( null ) ).toBe( '' );
	} );
} );

describe( 'currency.formatDecimal', () => {
	it( 'should round a number to 2 decimal places in USD', () => {
		const currency = Currency();
		expect( currency.formatDecimal( 9.49258 ) ).toBe( 9.49 );
		expect( currency.formatDecimal( 30 ) ).toBe( 30 );
		expect( currency.formatDecimal( 3.0002 ) ).toBe( 3 );
	} );

	it( 'should round a number to 0 decimal places in JPY', () => {
		const currency = Currency( { precision: 0 } );
		expect( currency.formatDecimal( 1239.88 ) ).toBe( 1240 );
		expect( currency.formatDecimal( 1500 ) ).toBe( 1500 );
		expect( currency.formatDecimal( 33715.02 ) ).toBe( 33715 );
	} );

	it( 'should correctly convert and round a string', () => {
		const currency = Currency();
		expect( currency.formatDecimal( '19.80' ) ).toBe( 19.8 );
	} );

	it( "should return 0 when given an input that isn't a number", () => {
		const currency = Currency();
		expect( currency.formatDecimal( 'abc' ) ).toBe( 0 );
		expect( currency.formatDecimal( false ) ).toBe( 0 );
		expect( currency.formatDecimal( null ) ).toBe( 0 );
	} );
} );

describe( 'currency.formatDecimalString', () => {
	it( 'should round a number to 2 decimal places in USD', () => {
		const currency = Currency();
		expect( currency.formatDecimalString( 9.49258 ) ).toBe( '9.49' );
		expect( currency.formatDecimalString( 30 ) ).toBe( '30.00' );
		expect( currency.formatDecimalString( 3.0002 ) ).toBe( '3.00' );
	} );

	it( 'should round a number to 0 decimal places in JPY', () => {
		const currency = Currency( { precision: 0 } );
		expect( currency.formatDecimalString( 1239.88 ) ).toBe( '1240' );
		expect( currency.formatDecimalString( 1500 ) ).toBe( '1500' );
		expect( currency.formatDecimalString( 33715.02 ) ).toBe( '33715' );
	} );

	it( 'should correctly convert and round a string', () => {
		const currency = Currency();
		expect( currency.formatDecimalString( '19.80' ) ).toBe( '19.80' );
	} );

	it( "should return empty string when given an input that isn't a number", () => {
		const currency = Currency();
		expect( currency.formatDecimalString( 'abc' ) ).toBe( '' );
		expect( currency.formatDecimalString( false ) ).toBe( '' );
		expect( currency.formatDecimalString( null ) ).toBe( '' );
	} );
} );
