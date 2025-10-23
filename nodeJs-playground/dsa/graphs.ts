class GraphNode {
	value: number
	neighbours: GraphNode[]
	constructor(value: number, neighbours: GraphNode[] = []) {
		this.value = value
		this.neighbours = neighbours
	}
}