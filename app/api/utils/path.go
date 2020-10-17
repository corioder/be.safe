package utils

import "strings"

// LastPathComponnet returns for example:
//
// "/aaa/bbb/cc" -> "cc"
//
// "/aaa/bbb/cc/" -> ""
//
// "/aaa/bbb/cc/dd" -> "dd"
func LastPathComponnet(path string) string {
	i := strings.LastIndex(path, "/")
	return path[i+1:]
}
