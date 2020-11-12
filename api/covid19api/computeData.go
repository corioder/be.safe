package covid19api

func computeData(path string) (cachedData, error) {
	switch path {
	case "categories":
		return getCategories()

	}

	return cachedData{}, nil
}

