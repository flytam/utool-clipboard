import Foundation
import Cocoa

let pasteboard: NSPasteboard = NSPasteboard.general
var count: Int = pasteboard.changeCount
// var saved: String = pasteboard.string(forType: .string) ?? "null"

repeat{
    usleep(500000)
    if(count < pasteboard.changeCount){
        usleep(100000)
        count = pasteboard.changeCount
        if let filePath = pasteboard.string(forType: .fileURL) {
            // TODO: multi files
            print("{ \"type\": \"file\", \"file_path\": \"\(filePath)\"}")
        } else if let imageData = pasteboard.data(forType: .tiff) ?? pasteboard.data(forType: .png) {
            let base64String = imageData.base64EncodedString(options: [])
            print("{ \"type\": \"image\", \"data\": \"\(base64String)\"}")
        } else if let text = pasteboard.string(forType: .string) {
            print("{ \"type\": \"text\", \"data\": \"\(text)\"}")
        }
        
        fflush(stdout)
    }
}while true