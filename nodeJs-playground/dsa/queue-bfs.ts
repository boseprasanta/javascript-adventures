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

class Queue {
  queue: TreeNode[]

	constructor() {
		this.queue = []
	}

	enqueue(value: TreeNode) {
		this.queue.push(value)
	}

	dequeue(): TreeNode | undefined {
		return this.queue.shift()
	}

	isEmpty(): boolean {
		return this.queue.length === 0
	}

	size(): number {
		return this.queue.length
	}

	printQueue() {
		console.log(this.queue.join('<--'))
	}

	getQueue() {
		return this.queue
	}
}

function bfs(root: TreeNode) {
	if (!root) return null

	const localQueue = new Queue()
	localQueue.enqueue(root)

	while (localQueue.size() > 0) {
		// current queue status
		const currentElement = localQueue.dequeue()
		console.log(currentElement?.value)
		if (currentElement && currentElement.left !== null) {
			localQueue.enqueue(currentElement.left)
		}

		if (currentElement && currentElement.right !== null) {
			localQueue.enqueue(currentElement.right)
		}
	}

}

const tree = buildTree()



console.log(bfs(tree))
