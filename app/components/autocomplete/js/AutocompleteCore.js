// Copyright 2019 Trevor Eyre
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import closest from './util/closest.js';
import isPromise from './util/isPromise.js';

class AutocompleteCore {
	value = '';
	searchCounter = 0;
	results = [];
	selectedIndex = -1;

	constructor({
		search,
		autoSelect = false,
		setValue = () => {},
		setAttribute = () => {},
		onUpdate = () => {},
		onSubmit = () => {},
		onShow = () => {},
		onHide = () => {},
		onLoading = () => {},
		onLoaded = () => {},
	} = {}) {
		this.search = isPromise(search) ? search : (value) => Promise.resolve(search(value));
		this.autoSelect = autoSelect;
		this.setValue = setValue;
		this.setAttribute = setAttribute;
		this.onUpdate = onUpdate;
		this.onSubmit = onSubmit;
		this.onShow = onShow;
		this.onHide = onHide;
		this.onLoading = onLoading;
		this.onLoaded = onLoaded;
	}

	handleInput = (event) => {
		const { value } = event.target;
		this.updateResults(value);
		this.value = value;
	};

	handleKeyDown = (event) => {
		const { key } = event;

		switch (key) {
			case 'Up': // IE/Edge
			case 'Down': // IE/Edge
			case 'ArrowUp':
			case 'ArrowDown': {
				const selectedIndex = key === 'ArrowUp' || key === 'Up' ? this.selectedIndex - 1 : this.selectedIndex + 1;
				event.preventDefault();
				this.handleArrows(selectedIndex);
				break;
			}
			case 'Tab': {
				this.selectResult();
				break;
			}
			case 'Enter': {
				const selectedResult = this.results[0];
				this.selectResult(true);
				this.onSubmit(selectedResult);
				break;
			}
			case 'Esc': // IE/Edge
			case 'Escape': {
				this.hideResults();
				this.setValue();
				break;
			}
			default:
				return;
		}
	};

	handleFocus = (event) => {
		const { value } = event.target;
		this.updateResults(value);
		this.value = value;
	};

	handleBlur = () => {
		this.hideResults();
	};

	// The mousedown event fires before the blur event. Calling preventDefault() when
	// the results list is clicked will prevent it from taking focus, firing the
	// blur event on the input element, and closing the results list before click fires.
	handleResultMouseDown = (event) => {
		event.preventDefault();
	};

	handleResultClick = (event) => {
		const { target } = event;
		const result = closest(target, '[data-result-index]');
		if (result) {
			this.selectedIndex = parseInt(result.dataset.resultIndex, 10);
			const selectedResult = this.results[this.selectedIndex];
			this.selectResult();
			this.onSubmit(selectedResult);
		}
	};

	handleArrows = (selectedIndex) => {
		// Loop selectedIndex back to first or last result if out of bounds
		const resultsCount = this.results.length;
		this.selectedIndex = ((selectedIndex % resultsCount) + resultsCount) % resultsCount;

		// Update results and aria attributes
		this.onUpdate(this.results, this.selectedIndex);
	};

	selectResult = (fromEnter) => {
		if (fromEnter) {
			const selectedResult = this.results[0];
			if (selectedResult) {
				this.setValue(selectedResult);
			}
			this.hideResults();
		} else {
			const selectedResult = this.results[this.selectedIndex];
			if (selectedResult) {
				this.setValue(selectedResult);
			}
			this.hideResults();
		}
	};

	updateResults = (value) => {
		const currentSearch = ++this.searchCounter;
		this.onLoading();
		this.search(value).then((results) => {
			if (currentSearch !== this.searchCounter) {
				return;
			}
			this.results = results;
			this.onLoaded();

			if (this.results.length === 0) {
				this.hideResults();
				return;
			}

			this.selectedIndex = this.autoSelect ? 0 : -1;
			this.onUpdate(this.results, this.selectedIndex);
			this.showResults();
		});
	};

	showResults = () => {
		this.setAttribute('aria-expanded', true);
		this.onShow();
	};

	hideResults = () => {
		this.selectedIndex = -1;
		this.results = [];
		this.setAttribute('aria-expanded', false);
		this.setAttribute('aria-activedescendant', '');
		this.onUpdate(this.results, this.selectedIndex);
		this.onHide();
	};

	// Make sure selected result isn't scrolled out of view
	checkSelectedResultVisible = (resultsElement) => {
		const selectedResultElement = resultsElement.querySelector(`[data-result-index="${this.selectedIndex}"]`);
		if (!selectedResultElement) {
			return;
		}

		const resultsPosition = resultsElement.getBoundingClientRect();
		const selectedPosition = selectedResultElement.getBoundingClientRect();

		if (selectedPosition.top < resultsPosition.top) {
			// Element is above viewable area
			resultsElement.scrollTop -= resultsPosition.top - selectedPosition.top;
		} else if (selectedPosition.bottom > resultsPosition.bottom) {
			// Element is below viewable area
			resultsElement.scrollTop += selectedPosition.bottom - resultsPosition.bottom;
		}
	};
}

export default AutocompleteCore;
