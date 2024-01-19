import Foundation
import Cocoa

let pasteboard: NSPasteboard = NSPasteboard.general
var count: Int = pasteboard.changeCount
var saved: String = pasteboard.string(forType: .string) ?? "null"

repeat{
    usleep(500000)
    if(count < pasteboard.changeCount && saved != pasteboard.string(forType: .string)){
        usleep(100000)
        count = pasteboard.changeCount
        saved = pasteboard.string(forType: .string) ?? "null"
        print("CLIPBOARD_CHANGE")
        if let items = pasteboard.pasteboardItems {
        for item in items {
                if let path = item.string(forType: .fileURL) {
                    print(path)
                }
            }
        }
        fflush(stdout)
    }
}while true