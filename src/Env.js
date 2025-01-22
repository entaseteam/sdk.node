export class Env {
    static APIURL = 'https://api.entase.com/v1';
    static DebugMode = false;
    
    static setDebugMode(enabled) {
        Env.DebugMode = enabled;
    }
} 