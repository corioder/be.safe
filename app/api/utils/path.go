package utils

import "strings"

func RelativeURLPath(root, path string) string {
	return strings.Replace(path, root, "", 1)
}
