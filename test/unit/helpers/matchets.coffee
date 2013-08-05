beforeEach ->
  @addMatchers
    toBeEqualToObject: (expected) ->
      _.isEqual @actual, expected
