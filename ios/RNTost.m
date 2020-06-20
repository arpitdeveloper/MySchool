//
//  RNTost.m
//  MySchool
//
//  Created by Apple on 16/05/20.
//

#import "RNTost.h"
#import <React/RCTLog.h>
@implementation RNTost
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end
