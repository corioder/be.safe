package cache

import (
	"fmt"
	"sync"
	"time"
)

// MakeDataFunc is used to get data if it isn't present in cache
type MakeDataFunc func(key string, info interface{}) (interface{}, error)

type cacheStruct struct {
	addedTime time.Time
	d         interface{}
}

// Cache is a gorutine safe, key value pair with expiration time cache
type Cache struct {
	mu             sync.RWMutex
	makeDataFunc   MakeDataFunc
	expirationTime time.Duration
	cachedData     map[string]cacheStruct
}

func NewCache(expirationTime time.Duration, makeDataFunc MakeDataFunc) *Cache {
	return &Cache{
		mu:           sync.RWMutex{},
		makeDataFunc: makeDataFunc,
		expirationTime: expirationTime,
		cachedData:   make(map[string]cacheStruct),
	}
}

func (c *Cache) GetData(key string, info interface{}) (interface{}, error) {
	c.mu.RLock()
	cached, ok := c.cachedData[key]
	c.mu.RUnlock()

	if !ok {
		fmt.Println("not cache, first hit")
		return c.makeDataAndAddToCache(key, info)
	}

	if time.Since(cached.addedTime) > c.expirationTime {
		fmt.Println("not cache, expired")
		return c.makeDataAndAddToCache(key, info)
	}

	return cached.d, nil
}

func (c *Cache) makeDataAndAddToCache(key string, info interface{}) (interface{}, error) {
	d, err := c.makeDataFunc(key, info)
	if err != nil {
		return nil, err
	}

	cached := cacheStruct{
		addedTime: time.Now(),
		d:         d,
	}

	c.mu.Lock()
	c.cachedData[key] = cached
	c.mu.Unlock()

	return d, nil
}
