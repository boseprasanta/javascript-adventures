class TreeNode {
	value: number
	left: TreeNode | null
	right: TreeNode | null

	constructor(value: number) {
		this.value = value
		this.left = null
		this.right = null
	}
}

function insertNode(root: TreeNode, value: number): void {
	if (value < root.value) {
		if (root.left === null) {
			root.left = new TreeNode(value)
		} else {
			insertNode(root.left, value)
		}
	} else {
		if (root.right === null) {
			root.right = new TreeNode(value)
		} else {
			insertNode(root.right, value)
		}
	}
}

// Build BST with values 1–10, root = 5
function buildTree(): TreeNode {
	const root = new TreeNode(5)
	for (let i = 1; i <= 10; i++) {
		if (i !== 5) insertNode(root, i)
	}
	return root
}

function rightSideView(root: TreeNode | null): number[] {
	let result: number[] = []

	let dfs = (head, depth) => {
		if (head === null) return 0

		if (result.length === depth) result.push(head?.value)

		dfs(head.right, depth + 1)
		dfs(head.left, depth + 1)
	}

	dfs(root, 0)

  return result
};

const tree1 = buildTree()

console.log(rightSideView(tree1))