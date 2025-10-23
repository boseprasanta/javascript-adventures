class GraphNode {
	value: number
	neighbours: GraphNode[]
	constructor(value: number, neighbours: GraphNode[] = []) {
		this.value = value
		this.neighbours = neighbours
	}
}


function normalDFS(root) {
	if (!root) return null

	normalDFS(root.left)
	console.log(root.value)
	normalDFS(root.right)
}


function normalBFS(root) {
	
	const queue = new Queue()

	queue.enqueue(root)

	while(queue.size() > 0) {
		const currentElem = queue.dequeue()

		console.log(currentElem?.value)

		if (currentElem?.left) {
			queue.enqueue(currentElem?.left)
		}

		if (currentElem?.right) {
			queue.enqueue(currentElem?.right)
		}
	}
}