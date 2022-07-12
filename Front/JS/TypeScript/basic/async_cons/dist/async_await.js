var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function waitAndAnswer(message) {
    console.log("Wait for 3 seconds.");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`You said ${message}`);
            resolve;
        }, 3000);
    });
}
function exec() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("step 1");
        yield waitAndAnswer("hi");
        console.log("step 2");
        yield waitAndAnswer("Hello");
        console.log("end");
    });
}
exec();
