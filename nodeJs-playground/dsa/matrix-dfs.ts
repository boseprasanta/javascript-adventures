/**
 * Q: Count the unique paths from the top left to the bottom right.
 * A single path may only move along 0's and can't visit the same cell more than once.
 */

function dfs(
	row: number, col: number,
	grid: number[][], visited: boolean[][]): number {

		let ROWS = grid.length
		let COLUMNS = grid[0].length 

	

		if (
			Math.min(row, col) < 0 // out of bounds
			|| row === ROWS
			|| col === COLUMNS
			|| visited[row][col] === true // already visited
			|| grid[row][col] === 1 // blocked
		) {
			return 0
		}

		if (row === ROWS - 1 && col === COLUMNS - 1) {
			return 1
		}

		visited[row][col] = true

		let count = 0

		count += dfs(row, col - 1, grid, visited)
		count += dfs(row, col + 1, grid, visited)
		count += dfs(row + 1, col, grid, visited)
		count += dfs(row - 1, col, grid, visited)

		visited[row][col] = false
		return count
}

const grid = [
	[0, 0, 0, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 1],
	[0, 1, 0, 0]
];

console.log(
	dfs(
		0,
		0,
		grid,
		[
			[false, false, false, false],
			[false, false, false, false],
			[false, false, false, false],
			[false, false, false, false]
		]
	)
)

// dfs ->
// is stack based and does revisit same node in matrix
// - works well with backtracking / combination kind of problem

// dfs ->
// is queue based and doesn't revisit same node in matrix
// works well with shortest path - cause bfs gives shortest only