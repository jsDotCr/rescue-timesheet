export type Date = string
export type Activity = 'a' | 'b'
export type Category = 'Business' | 'Communication & Scheduling' | 'Social Networking' | 'Design & Composition' | 'Entertainment' | 'News & Opinion' | 'Reference & Learning' | 'Software Development' | 'Shopping' | 'Utilities' | 'Miscellaneous' | 'Uncategorized'

export type Productivity = -2 | -1 | 0 | 1 | 2
export type Row = [Date, string, string, Activity, Category, Productivity]