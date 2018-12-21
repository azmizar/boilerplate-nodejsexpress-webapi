'use strict';

/***************************************
 * Utilies related to finding items
 ***************************************/
const MODULENAME = 'CommonFindService';

/**
 * 3rd party imports
 */
const _ = require('lodash');

/**
 * Search for items in the list if it is the same or is part of the item
 * @param {Array} list Array or list of items to search in
 * @param {Object} item Item to search for
 * @param {Boolean} exactMatch True to do exact match, false to do contains (default)
 * Returns index of item in the list (-1 is not found)
 */
function existInList(list, item, exactMatch) {
  const taskName = 'existInList()';

  try {
    // default to false
    if (typeof exactMatch === 'undefined') {
      exactMatch = false;
    }

    let index = -1;

    if (exactMatch) {
      // exact match
      index = _.findIndex(list, (itemInList) => {
        return itemInList === item;
      });
    } else {
      // item in the list is part of item
      index = _.findIndex(list, (itemInList) => {
        return item.indexOf(itemInList) !== -1;
      });
    }

    return index;
  } catch (e) {
    throw e;
  }
}

/**
 * Service definitions
 */
const CommonFindService = {
  existInList: existInList
};

/**
 * Exports
 */
module.exports = CommonFindService;
