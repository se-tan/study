/* export がついていないものはスコープ外からは不可視 */
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

