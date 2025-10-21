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

// Helper function to insert a value into the BST
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

// function searchTree(root, value) {
// 	if (root === null) return false

// 	if (root.value === value) {
// 		return true
// 	}

// 	if (value < root.value) {
// 		return searchTree(root.left, value)
// 	}

// 	if (value > root.value) {
// 		return searchTree(root.right, value) 
// 	}
// }

// if (searchTree(tree, 100)) {
// 	console.log("value found")
// } else {
// 	console.log("value not found")
// }

// function insertIntoBinaryTree(root, value) {

// 	if (root === null) {
// 		return new TreeNode(value)
// 	}

// 	if (value < root.value) {
// 		root.left = insertIntoBinaryTree(root.left, value)
// 	}

// 	if (value > root.value) {
// 		root.right = insertIntoBinaryTree(root.right, value)
// 	}

// 	return root

// }


// function findMinElement(root) {
// 	if (root === null) return null
// 	if (root.left === null) return root

// 	if (root.left) {
// 		return findMinElement(root.left)
// 	}
// }

// console.log(findMinElement(tree))

function inorder(root) {
	if (!root) return null
	inorder(root.left)
	console.log(root.value)
	inorder(root.right)
}

export { TreeNode , buildTree }
