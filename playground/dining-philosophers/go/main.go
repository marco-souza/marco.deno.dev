package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

const PHILOSOPHER_NUMBER = 20

// Philosophers state
const (
	Thinking = iota
	Hungry
	Eating
)

var philosophersState = make([]int, PHILOSOPHER_NUMBER)
var stateMutex = sync.Mutex{}

func left(idx int) int {
	return (idx - 1 + PHILOSOPHER_NUMBER) % PHILOSOPHER_NUMBER
}

func right(idx int) int {
	return (idx + 1 + PHILOSOPHER_NUMBER) % PHILOSOPHER_NUMBER
}

func test(idx int) {
	if philosophersState[idx] == Hungry &&
		philosophersState[left(idx)] != Eating &&
		philosophersState[right(idx)] != Eating {

		philosophersState[idx] = Eating
	}
}

func think(idx int) {
	durantion := rand.Intn(1500) + 500
	time.Sleep(time.Duration(durantion) * time.Millisecond)
}

func takeForks(idx int) {
	// INFO: lock critical region
	stateMutex.Lock()

	philosophersState[idx] = Hungry
	test(idx)

	stateMutex.Unlock()
}

func eat(idx int) {
	durantion := rand.Intn(1500) + 500
	time.Sleep(time.Duration(durantion) * time.Millisecond)
}

func putForks(idx int) {
	// INFO: lock critical region
	stateMutex.Lock()
	defer stateMutex.Unlock()

	philosophersState[idx] = Thinking
	test(left(idx))
	test(right(idx))
}

func philosopher(idx int) {
	for {
		think(idx)
		takeForks(idx)
		eat(idx)
		putForks(idx)
	}
}

func main() {
	for i := range PHILOSOPHER_NUMBER {
		go philosopher(i)
	}

	for {
		board := make([]string, PHILOSOPHER_NUMBER)
		for i := range PHILOSOPHER_NUMBER {
			switch philosophersState[i] {
			case Thinking:
				board[i] = "🧠"
			case Hungry:
				board[i] = "🍽️"
			case Eating:
				board[i] = "🍝"
			}
		}

		fmt.Printf("\rPhilosophers state: %v", board)
	}
}
