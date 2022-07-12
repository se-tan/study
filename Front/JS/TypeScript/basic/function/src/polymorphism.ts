function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}
map(['a', 'b', 'c'], (_) => _ === 'a');

/* Generic Alias */
type MyEvent<T> = {
  target: T;
  type: string;
};
let myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#myButton'),
  type: 'click',
};

// 1. triggerEvent を、オブジェクトを渡して呼び出す
// 2. 引数が MyEvent<T> かつ MyEvent<T>の定義内容を認識する
// 3. target フィールドの内容を認識する
// 4. Tのすべての出現箇所を Element | null で置換する
// 5. すべての型が割当て可能性を満たしているか確認する
function triggerEvent<T>(event: MyEvent<T>): void {}
triggerEvent({
  target: document.querySelector('#myButton'),
  type: 'mouseover',
});

/* Limited polymorphism */
// 通常の TreeNode
type TreeNode = {
  value: string;
};
// 子ノードを持たない TreeNode である LeafNode
type LeafNode = TreeNode & {
  isLeaf: true;
};
// 子ノードを持つ TreeNode である InnerNode
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};

function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value),
  };
}

type HasSides = { numberOfSides: number };
type SidesHaveLength = { sideLength: number };

function logPerimeter<Shape extends HasSides & SidesHaveLength>(
  s: Shape
): Shape {
  console.log(s.numberOfSides * s.numberOfSides);
  return s;
}

type Square = HasSides & SidesHaveLength;
let square: Square = { numberOfSides: 4, sideLength: 3 };
logPerimeter(square);
