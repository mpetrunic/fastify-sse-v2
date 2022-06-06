import {expect} from "chai";
import pushable from "it-pushable";
import {EventEmitter} from "events";
import {isAsyncIterable} from "../src/util";

describe("utils", function() {
  describe("isAsyncIterable", function() {
    it("should recognize", function() {
      const source: [unknown, boolean, string?][] = [
        [null, false],
        [undefined, false],
        [(async function * source () {
          for (let i = 0; i < 10; i++) {
            yield {id: String(i), data: "Some message"};
          }
        })(), true],
        [{}, false],
        [pushable<any>(), true],
        [new EventEmitter(), false]
      ]; 
      for(const testCase of source) {
        expect(isAsyncIterable(testCase[0])).to.be.equal(testCase[1]);
      }
    });
  });
});