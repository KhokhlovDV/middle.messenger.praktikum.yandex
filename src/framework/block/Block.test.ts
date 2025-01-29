import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Block } from './Block';

describe('Block', () => {
    class MockBlock extends Block {
        render() {
            return `<div>{{{value}}}</div>`;
        }
    }

    describe('Render behavior', () => {
        let block: Block;

        beforeEach(() => {
            block = new MockBlock({ value: 'Test' });
        });

        it('should render right content', () => {
            expect(block.getContent().innerHTML).to.be.equals('Test');
        });

        it('should update content, after changing props', () => {
            block.setProps({ value: 'NewValue' });
            expect(block.getContent().innerHTML).to.be.equals('NewValue');
        });
    });

    describe('Props behavior', () => {
        let block: Block;
        let child: Block;
        let list: Block[];

        beforeEach(() => {
            child = new MockBlock({ value: 'child' });
            list = [
                new MockBlock({ value: 'element1' }),
                new MockBlock({ value: 'element1' }),
                new MockBlock({ value: 'element1' }),
            ];
            block = new MockBlock({
                value: 'Test',
                Child: child,
                List: list,
            });
        });

        it('props should be divided into children', () => {
            expect(block.getChildren()).to.deep.equal({ Child: child });
        });

        it('props should be divided into lists', () => {
            expect(block.getLists()).to.deep.equal({ List: list });
        });
    });
});
