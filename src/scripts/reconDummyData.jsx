export const ReconDummyData = {
    export const RECON_RULE = [
        {
            "SWAG_RULE_ID": 101,
            "CONTENT_TYPE_CODE": "VIRAL_VIDEO",
            "RULE_STYLE": "HASHTAG_MATCH",
            "SOURCE_ACCOUNT_NAME": "primaryProfile",
            "TARGET_ACCOUNT_NAME": "secondaryProfile",
            "CREATOR_USER_ID": "HYPE-MASTER-01",
            "CREATED_ON": "2024-03-10T05:00:00.000Z",
            "MOD_USER_ID": "SWAG_RULES_ADMIN",
            "MODIFIED_ON": null,
            "SWAG_RULE_ORDER": 10,
            "SOURCE_FROM_QUERY": "CONTENT_DATA primaryProfile,ENGAGEMENT_STATS secondaryProfile",
            "SOURCE_WHERE_CLAUSE": "primaryProfile.ACTIVE_STATUS = 'LIVE' and secondaryProfile.ACTIVE_STATUS = 'LIVE' and primaryProfile.profile_id=123 and primaryProfile.hashtag_match is null And primaryProfile.Content_Type = 'VIRAL_VIDEO' AND primaryProfile.brand_code = 'HYPE' AND primaryProfile.POST_ID=secondaryProfile.POST_ID AND primaryProfile.POST_VERSION=secondaryProfile.POST_VERSION",
            "TARGET_FROM_QUERY": "CONTENT_DATA primaryProfile,ENGAGEMENT_STATS secondaryProfile",
            "TARGET_WHERE_CLAUSE": "primaryProfile.ACTIVE_STATUS = 'LIVE' and secondaryProfile.ACTIVE_STATUS = 'LIVE' and primaryProfile.profile_id=456 and primaryProfile.hashtag_match is null And primaryProfile.Content_Type = 'VIRAL_VIDEO' AND primaryProfile.POST_ID=secondaryProfile.POST_ID AND primaryProfile.POST_VERSION=secondaryProfile.POST_VERSION",
            "TRENDING_ORDER": 1,
            "ACTIVE_STATUS": "N"
        },
        {
            "SWAG_RULE_ID": 102,
            "CONTENT_TYPE_CODE": "LIVESTREAM",
            "RULE_STYLE": "MENTION_MATCH",
            "SOURCE_ACCOUNT_NAME": "primaryProfile",
            "TARGET_ACCOUNT_NAME": "secondaryProfile",
            "CREATOR_USER_ID": "INFLUENCER-01",
            "CREATED_ON": "2024-04-15T05:00:00.000Z",
            "MOD_USER_ID": "CONTENT_RULES_ADMIN",
            "MODIFIED_ON": null,
            "SWAG_RULE_ORDER": 20,
            "SOURCE_FROM_QUERY": "CONTENT_DATA primaryProfile,ENGAGEMENT_STATS secondaryProfile",
            "SOURCE_WHERE_CLAUSE": "primaryProfile.ACTIVE_STATUS = 'LIVE' and secondaryProfile.ACTIVE_STATUS = 'LIVE' and primaryProfile.profile_id=123 and primaryProfile.mention_match is null And primaryProfile.Content_Type = 'LIVESTREAM' AND primaryProfile.POST_ID=secondaryProfile.POST_ID AND primaryProfile.POST_VERSION=secondaryProfile.POST_VERSION",
            "TARGET_FROM_QUERY": "CONTENT_DATA primaryProfile,ENGAGEMENT_STATS secondaryProfile",
            "TARGET_WHERE_CLAUSE": "primaryProfile.ACTIVE_STATUS = 'LIVE' and secondaryProfile.ACTIVE_STATUS = 'LIVE' and primaryProfile.profile_id=456 and primaryProfile.mention_match is null And primaryProfile.Content_Type = 'LIVESTREAM' AND primaryProfile.POST_ID=secondaryProfile.POST_ID AND primaryProfile.POST_VERSION=secondaryProfile.POST_VERSION",
            "TRENDING_ORDER": 2,
            "ACTIVE_STATUS": "Y"
        },
        {
            "SWAG_RULE_ID": 103,
            "CONTENT_TYPE_CODE": "STORY",
            "RULE_STYLE": "TAG_MATCH",
            "SOURCE_ACCOUNT_NAME": "mainProfile",
            "TARGET_ACCOUNT_NAME": "altProfile",
            "CREATOR_USER_ID": "TREND-MAKER",
            "CREATED_ON": "2024-05-10T05:00:00.000Z",
            "MOD_USER_ID": "STORY_RULES_ADMIN",
            "MODIFIED_ON": null,
            "SWAG_RULE_ORDER": 30,
            "SOURCE_FROM_QUERY": "CONTENT_DATA mainProfile,ENGAGEMENT_STATS altProfile",
            "SOURCE_WHERE_CLAUSE": "mainProfile.ACTIVE_STATUS = 'LIVE' and altProfile.ACTIVE_STATUS = 'LIVE' and mainProfile.profile_id=789 and mainProfile.tag_match is null And mainProfile.Content_Type = 'STORY' AND mainProfile.brand_code In ('HYPE', 'TRENDY') AND mainProfile.POST_ID=altProfile.POST_ID AND mainProfile.POST_VERSION=altProfile.POST_VERSION",
            "TARGET_FROM_QUERY": "CONTENT_DATA mainProfile,ENGAGEMENT_STATS altProfile",
            "TARGET_WHERE_CLAUSE": "mainProfile.ACTIVE_STATUS = 'LIVE' and altProfile.ACTIVE_STATUS = 'LIVE' and mainProfile.profile_id=123 and mainProfile.tag_match is null And mainProfile.Content_Type = 'STORY' AND mainProfile.POST_ID=altProfile.POST_ID AND mainProfile.POST_VERSION=altProfile.POST_VERSION",
            "TRENDING_ORDER": 3,
            "ACTIVE_STATUS": "N"
        },
        {
            "SWAG_RULE_ID": 104,
            "CONTENT_TYPE_CODE": "POST",
            "RULE_STYLE": "LIKES_MATCH",
            "SOURCE_ACCOUNT_NAME": "mainProfile",
            "TARGET_ACCOUNT_NAME": "altProfile",
            "CREATOR_USER_ID": "POST-MASTER",
            "CREATED_ON": "2024-06-20T05:00:00.000Z",
            "MOD_USER_ID": "POST_RULES_ADMIN",
            "MODIFIED_ON": null,
            "SWAG_RULE_ORDER": 40,
            "SOURCE_FROM_QUERY": "CONTENT_DATA mainProfile,ENGAGEMENT_STATS altProfile",
            "SOURCE_WHERE_CLAUSE": "mainProfile.ACTIVE_STATUS = 'LIVE' and mainProfile.profile_id in (123,124) and mainProfile.group_Id is null  AND mainProfile.POST_ID=altProfile.POST_ID AND mainProfile.POST_VERSION=altProfile.POST_VERSION  AND altProfile.ENGAGE_TYPE='Likes' and altProfile.ACTIVE_STATUS = 'LIVE' ",
            "TARGET_FROM_QUERY": "CONTENT_DATA mainProfile,ENGAGEMENT_STATS altProfile",
            "TARGET_WHERE_CLAUSE": "mainProfile.ACTIVE_STATUS = 'LIVE'  and mainProfile.profile_id=456 and mainProfile.group_Id is null  AND mainProfile.POST_ID=altProfile.POST_ID AND mainProfile.POST_VERSION=altProfile.POST_VERSION AND altProfile.ENGAGE_TYPE='Likes' and altProfile.ACTIVE_STATUS = 'LIVE' and mainProfile.SHARE_PLATFORM in ('HYPE','TRENDY') ",
            "TRENDING_ORDER": 4,
            "ACTIVE_STATUS": "Y"
        }
    ];
    
    export const swagRuleDetails = [
        {
            "SWAG_RULE_ID": 101,
            "SWAG_CRITERIA_ID": 201,
            "MAX_RECON_PASS": "5",
            "RULE_TYPE_CODE": "AUTO",
            "SWAG_CYCLE_LIST": null,
            "CREATOR_USER_ID": "POST-MASTER-02",
            "CREATED_ON": "2024-03-10T05:00:00.000Z",
            "MOD_USER_ID": "POST-MASTER",
            "MODIFIED_ON": "2024-07-18T15:25:03.000Z",
            "CRITERIA_ORDER": 1,
            "REQUIRED_STATUS": "UnMatched",
            "MATCH_STATUS": "Matched",
            "BREAK_STATUS": "UnMatched",
            "COMMENTS": null,
            "ACTIVE_STATUS": "Y"
        },
        {
            "SWAG_RULE_ID": 102,
            "SWAG_CRITERIA_ID": 202,
            "MAX_RECON_PASS": "3",
            "RULE_TYPE_CODE": "AUTO",
            "SWAG_CYCLE_LIST": null,
            "CREATOR_USER_ID": "TREND-MAKER-03",
            "CREATED_ON": "2024-04-12T05:00:00.000Z",
            "MOD_USER_ID": "TREND-MAKER",
            "MODIFIED_ON": "2024-06-18T15:25:03.000Z",
            "CRITERIA_ORDER": 2,
            "REQUIRED_STATUS": "UnMatched",
            "MATCH_STATUS": "Matched",
            "BREAK_STATUS": "UnMatched",
            "COMMENTS": null,
            "ACTIVE_STATUS": "Y"
        }
    ];
    
    export const swagCriteriaDetails = [
        {
            "SWAG_CRITERIA_ID": 201,
            "ATTRIBUTE_REF_ID": 301,
            "PASS_NUMBER": 3,
            "THRESHOLD_TYPE": "EngagementPercent",
            "THRESHOLD_VALUE": 0.2,
            "THRESHOLD_CURR": "USD",
            "CREATOR_USER_ID": null,
            "CREATED_ON": null,
            "MOD_USER_ID": null,
            "MODIFIED_ON": null,
            "THRESHOLD_INCREMENT": null
        },
        {
            "SWAG_CRITERIA_ID": 202,
            "ATTRIBUTE_REF_ID": 302,
            "PASS_NUMBER": 4,
            "THRESHOLD_TYPE": "LikesPercent",
            "THRESHOLD_VALUE": 0.3,
            "THRESHOLD_CURR": "USD",
            "CREATOR_USER_ID": null,
            "CREATED_ON": null,
            "MOD_USER_ID": null,
            "MODIFIED_ON": null,
            "THRESHOLD_INCREMENT": null
        }
    ];
    
    export const swagAttributeReference = [
        {
            "ATTRIBUTE_REF_ID": 301,
            "REF_NAME": "UniquePostId",
            "REF_TYPE": "Required",
            "LINK_REF_NAME": null,
            "REF_OPERATOR": null,
            "SOURCE_ACCOUNT_NAME": null,
            "SOURCE_ATTRIBUTE": "main.POST_ID",
            "TARGET_ACCOUNT_NAME": null,
            "TARGET_ATTRIBUTE": "main.post_id",
            "CREATOR_USER_ID": null,
            "CREATED_ON": null,
            "MOD_USER_ID": "POST-MASTER",
            "MODIFIED_ON": "2024-07-12T05:00:00.000Z",
            "DATA_TYPE": "BigDecimal",
            "REF_RULE_ID": null,
            "LINK_REF_OPERATOR": "=",
            "SINGLE_THREAD_IND": null,
            "CONTENT_TYPE_CODE": "STORY",
            "RULE_STYLE": "TAG_MATCH"
        },
        {
            "ATTRIBUTE_REF_ID": 302,
            "REF_NAME": "UniqueLikes",
            "REF_TYPE": "Required",
            "LINK_REF_NAME": null,
            "REF_OPERATOR": null,
            "SOURCE_ACCOUNT_NAME": null,
            "SOURCE_ATTRIBUTE": "main.LIKES_VERSION",
            "TARGET_ACCOUNT_NAME": null,
            "TARGET_ATTRIBUTE": "main.likes_version",
            "CREATOR_USER_ID": null,
            "CREATED_ON": null,
            "MOD_USER_ID": "POST-MASTER",
            "MODIFIED_ON": "2024-07-12T05:00:00.000Z",
            "DATA_TYPE": "BigDecimal",
            "REF_RULE_ID": null,
            "LINK_REF_OPERATOR": "=",
            "SINGLE_THREAD_IND": null,
            "CONTENT_TYPE_CODE": "LIVESTREAM",
            "RULE_STYLE": "MENTION_MATCH"
        }
    ];
    
}