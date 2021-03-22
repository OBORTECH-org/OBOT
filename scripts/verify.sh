#!/bin/bash

if [ -z $1 ]; then
  truffle run verify ObortechToken --network rinkeby
  truffle run verify FreezingContract --network rinkeby
  truffle run verify TokenDistribution --network rinkeby
else
  if [ -z $2 ]; then
    truffle run verify $1 --network rinkeby
  else
    if [[ $1 = "all" ]]; then
      truffle run verify ObortechToken --network $2
      truffle run verify FreezingContract --network $2
#      truffle run verify TokenDistribution --network $2
    else
      truffle run verify $1 --network $2
    fi
  fi
fi

