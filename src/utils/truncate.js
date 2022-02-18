import _ from 'lodash'

export const stripTags = function(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "").replace('&nbsp;', '');
}

// Truncate description for Featured Items
export const truncateFeatured = function(text) {
  const truncateParams = {
    length: 300, separator: '। ', omission: '। ...'
  }
  return _.truncate(stripTags(text), truncateParams)
}

// Truncate description for Hero Component
export const truncateHero = function(text) {
  const truncateParams = {
    length: 250, separator: '।', omission: '। ...'
  }
  return _.truncate(stripTags(text), truncateParams)
}