import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

describe("próba",()=>{
    it("dsa",()=>{
        expect(true).toBe(true)
    })
})