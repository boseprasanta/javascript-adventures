class QueueList {
  queue: number[][] = []

	enque(value: number[]) {
		this.queue.push(value)
	}

	dequeue(): number[] {
		if (this.size() > 0) {
			return this.queue.shift()
		} else {
			return []
		}
		
	}

	size(): number {
		return this.queue.length
	}
 
	getItems(): number[][] {
		return this.queue
	}
}

function bfs(grid: number[][]) {
	const ROWS = grid.length
	const COLS = grid[0].length

	const queue = new QueueList()

	const visited: boolean[][] = Array.from({ length: ROWS }, () => new Array(COLS).fill(false))

	queue.enque([0, 0])
	visited[0][0] = true

	const directions: number[][] = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	]

	let length: number = 0

	while(queue.size() > 0) {
		const queueCurrentSize: number = queue.size()
		for (let i = 0; i < queueCurrentSize; i++) {
			const queueElem = queue.dequeue()

			if (queueElem[0] === ROWS - 1 && queueElem[1] === COLS - 1) {
				// reached destination
				return length
			}

			for (let [rowMove, colMove] of directions) {
				const calcRow = queueElem[0] + rowMove
				const calcCol = queueElem[1] + colMove
				if (
					(calcRow < 0 || calcRow >= ROWS || calcCol < 0 || calcCol >= COLS)
					|| visited[calcRow][calcCol] === true // already visited
					|| grid[calcRow][calcCol] === 1 // blocked
				) {
					continue
				}

				queue.enque([calcRow, calcCol])
				visited[calcRow][calcCol] = true
			}
		}
		length++
	}

	return -1
}