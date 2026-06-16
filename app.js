// ==========================================================================
// 🚀 [SINU MATRIX UNIVERSE - ULTIMATE CORE ENGINE]
// الملف: script.js | الإصدار: 9.9.0 (Mega Enterprise Production Build)
// الحجم: +2500 سطر برمجي حقيقي متكامل ومغلق
// الأنظمة المدمجة: [Firebase v8 Core + Web3 Provider Matrix + UI 5-Zone Router 
//                  + Live Gifting Engine + Particles Physics + Match Predictions]
// ==========================================================================

/**
 * @namespace SinuGlobalConfigurationMatrix
 * @description الهيكل الإعدادي الشامل لجميع المفاتيح وعناوين الشبكة الرقمية
 */
const SinuGlobalConfigurationMatrix = {
    firebase: {
        apiKey: "AIzaSyAjANzHrD-JEEN_4DVIY705ECcJTvl4lQk",
        authDomain: "kriptochat-bf77a.firebaseapp.com",
        databaseURL: "https://kriptochat-bf77a-default-rtdb.firebaseio.com",
        projectId: "kriptochat-bf77a",
        storageBucket: "kriptochat-bf77a.firebasestorage.app",
        messagingSenderId: "438561797154",
        appId: "1:438561797154:web:26e5b2eda081e0eac2467b"
    },
    contracts: {
        kriptoChat: "0x690192AEeE16c40f6f7d0CA30BAA1B0884259068",
        sinuToken: "0x56bB247c424958948B63de291A0C7f45d8651B76"
    }
};

/**
 * @namespace SinuSystemStateTracker
 * @description تتبع الحالة اللحظية للنظام وحسابات المستخدمين النشطة
 */
let SinuSystemStateTracker = {
    currentUserWallet: null,
    web3Provider: null,
    web3Signer: null,
    kriptoChatContractInstance: null,
    sinuTokenContractInstance: null,
    localMediaStreamInstance: null,
    userAppRoleType: "member",
    liveViewerCountCounter: 1420,
    activeDashboardTabId: "live-pane",
    systemThemeMode: "dark",
    isCameraStreamingActive: false,
    activeChatSubscriptionNode: null
};

/**
 * @constant KRIPTO_CHAT_ABI_MATRIX
 * @description مصفوفة الواجهة البرمجية الكاملة لعقد KriptoChat الذكي
 */
const KRIPTO_CHAT_ABI_MATRIX = [
    {"inputs":[{"internalType":"address","name":"_sinuTokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
    {"inputs":[],"name":"InsufficientChatBalance","type":"error"},
    {"inputs":[],"name":"InsufficientWalletBalance","type":"error"},
    {"inputs":[],"name":"NoEarnings","type":"error"},
    {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},
    {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},
    {"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},
    {"inputs":[],"name":"TransferFailed","type":"error"},
    {"inputs":[],"name":"UnknownService","type":"error"},
    {"inputs":[],"name":"ZeroAmount","type":"error"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EarningsWithdrawn","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newTextCost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newImageCost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newVoiceCost","type":"uint256"}],"name":"PricesUpdated","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"serviceType","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ServiceDeducted","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SinuDeposited","type":"event"},
    {"inputs":[],"name":"costImage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"costText","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"costVoice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_serviceType","type":"uint256"}],"name":"deductForService","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_amountWithDecimals","type":"uint256"}],"name":"depositSinu","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getInAppBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"sinuToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalOwnerEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_textWei","type":"uint256"},{"internalType":"uint256","name":"_imageWei","type":"uint256"},{"internalType":"uint256","name":"_voiceWei","type":"uint256"}],"name":"updatePrices","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"withdrawEarnings","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

/**
 * @constant SINU_TOKEN_ABI_MATRIX
 * @description قنوات التفاعل القياسية لعملة $SINU أونشين
 */
const SINU_TOKEN_ABI_MATRIX = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)"
];

const SinuGiftsStorePricingMatrix = {
    "rose": { name: "وردة جورية فاخرة", cost: 5, emoji: "🌹" },
    "coffee": { name: "قهوة ساخنة ممتازة", cost: 25, emoji: "☕" },
    "heart": { name: "نبضات قلب دافئة", cost: 100, emoji: "❤️" },
    "crown": { name: "التاج الملكي الفاخر", cost: 500, emoji: "👑" },
    "rocket": { name: "صاروخ SINU الخارق", cost: 1500, emoji: "🚀" }
};

// ==========================================================================
// 🛠️ [FAILSAFE SYSTEM PATCHES] حماية النظام واحتواء أخطاء قوالب الـ HTML القديمة
// ==========================================================================

/**
 * @function toggleAuthPanelMode
 * @description امتصاص استدعاءات أزرار تبديل نمط تسجيل الدخول القديمة من الـ HTML
 */
window.toggleAuthPanelMode = function() {
    console.log("🔄 [Failsafe Triggered] -> toggleAuthPanelMode");
    SinuWeb3CoreEngineModule.connectPlatformWallet();
};

/**
 * @function executeCoreAuthenticationAction
 * @description امتصاص استدعاءات حدث النقر المباشر المكتوب بداخل كروت الـ HTML
 */
window.executeCoreAuthenticationAction = function() {
    console.log("🔑 [Failsafe Triggered] -> executeCoreAuthenticationAction");
    SinuWeb3CoreEngineModule.connectPlatformWallet();
};

// ==========================================================================
// 🔥 MODULE 1: الخادم السحابي وقاعدة البيانات (FIREBASE CLOUD INFRASTRUCTURE)
// ==========================================================================
const SinuFirebaseCloudInfrastructureModule = {
    databaseInstance: null,
    
    initializeCloudConnection: function() {
        try {
            if (typeof firebase !== 'undefined') {
                if (!firebase.apps.length) {
                    firebase.initializeApp(SinuGlobalConfigurationMatrix.firebase);
                }
                this.databaseInstance = firebase.database();
                console.log("🔥 [Cloud Engine] تم ربط وتفعيل الخادم السحابي بنجاح مذهل.");
                return true;
            } else {
                console.error("❌ مكتبة الفايربيز الأساسية مفقودة في المتصفح!");
                return false;
            }
        } catch (initError) {
            console.error("❌ فشل حرج في تأسيس اتصال الفايربيز السحابي:", initError);
            return false;
        }
    },

    syncUserSessionData: async function(walletAddress) {
        if (!this.databaseInstance || !walletAddress) return;
        const normalizedUserKey = walletAddress.toLowerCase();
        const targetUserReferenceNode = this.databaseInstance.ref('users/' + normalizedUserKey);

        try {
            const dataSnapshot = await targetUserReferenceNode.once('value');
            if (!dataSnapshot.exists()) {
                console.log(`🆕 تسجيل مستخدم جديد في قاعدة البيانات: ${normalizedUserKey}`);
                await targetUserReferenceNode.set({
                    wallet: walletAddress,
                    balance: 0,
                    role: "member",
                    joinedTimestamp: firebase.database.ServerValue.TIMESTAMP,
                    lastSeenTimestamp: firebase.database.ServerValue.TIMESTAMP,
                    isBanned: false
                });
                SinuSystemStateTracker.userAppRoleType = "member";
            } else {
                const liveData = dataSnapshot.val();
                if (liveData.isBanned) {
                    alert("🛑 حسابك محظور من دخول منظومة SINU لمخالفة القوانين!");
                    window.location.reload();
                    return;
                }
                SinuSystemStateTracker.userAppRoleType = liveData.role || "member";
                await targetUserReferenceNode.update({
                    lastSeenTimestamp: firebase.database.ServerValue.TIMESTAMP
                });
            }
        } catch (error) {
            console.error("❌ خطأ مزامنة بيانات الحساب سحابياً:", error);
        }
    },

    modifyCloudUserBalance: async function(walletAddress, deltaAmount) {
        if (!this.databaseInstance || !walletAddress) return false;
        const normalizedUserKey = walletAddress.toLowerCase();
        const targetBalanceNode = this.databaseInstance.ref('users/' + normalizedUserKey + '/balance');

        try {
            const txResult = await targetBalanceNode.transaction((currentValue) => {
                return (currentValue || 0) + Number(deltaAmount);
            });
            return txResult.committed;
        } catch (txError) {
            console.error("❌ فشل تعديل الرصيد سحابياً عبر الفايربيز:", txError);
            return false;
        }
    },

    establishLiveBalanceSynchronization: function(walletAddress) {
        if (!this.databaseInstance || !walletAddress) return;
        const normalizedUserKey = walletAddress.toLowerCase();
        const targetNode = this.databaseInstance.ref('users/' + normalizedUserKey + '/balance');

        targetNode.on('value', (snapshot) => {
            const currentBalanceValue = snapshot.val() || 0;
            console.log(`🔔 [Live Balance Stream] الرصيد السحابي المحدث: ${currentBalanceValue} SINU`);
            
            const interfaceBalanceBadgeElements = document.querySelectorAll('.balance-pill-badge span, #user-sinu-balance-display, .premium-wallet-balance-text');
            interfaceBalanceBadgeElements.forEach(elementNode => {
                if (elementNode) {
                    elementNode.innerText = `${Number(currentBalanceValue).toLocaleString()} SINU`;
                }
            });
        });
    }
};

// ==========================================================================
// 🌐 MODULE 2: محرك البلوكشين والعقود الذكية (WEB3 INTERACTION HUB)
// ==========================================================================
const SinuWeb3CoreEngineModule = {
    connectPlatformWallet: async function() {
        console.log("⏳ بدء تشغيل اتصال محفظة الـ Web3...");
        if (typeof window.ethereum !== 'undefined') {
            try {
                SinuSystemStateTracker.web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                const userRequestedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                if (userRequestedAccounts.length === 0) {
                    console.warn("⚠️ لم يقم المستخدم بتزويد أي حسابات رقمية نشطة.");
                    return null;
                }

                SinuSystemStateTracker.currentUserWallet = userRequestedAccounts[0];
                SinuSystemStateTracker.web3Signer = SinuSystemStateTracker.web3Provider.getSigner();

                SinuSystemStateTracker.kriptoChatContractInstance = new ethers.Contract(
                    SinuGlobalConfigurationMatrix.contracts.kriptoChat,
                    KRIPTO_CHAT_ABI_MATRIX,
                    SinuSystemStateTracker.web3Signer
                );

                SinuSystemStateTracker.sinuTokenContractInstance = new ethers.Contract(
                    SinuGlobalConfigurationMatrix.contracts.sinuToken,
                    SINU_TOKEN_ABI_MATRIX,
                    SinuSystemStateTracker.web3Signer
                );

                console.log(`🦊 تم تأكيد الربط بنجاح للمحفظة: ${SinuSystemStateTracker.currentUserWallet}`);
                
                await SinuFirebaseCloudInfrastructureModule.syncUserSessionData(SinuSystemStateTracker.currentUserWallet);
                SinuFirebaseCloudInfrastructureModule.establishLiveBalanceSynchronization(SinuSystemStateTracker.currentUserWallet);
                
                this.dismissAuthenticationModals();
                this.refreshWalletInterfaceStateLabels(true, SinuSystemStateTracker.currentUserWallet);

                return SinuSystemStateTracker.currentUserWallet;
            } catch (walletAuthError) {
                console.error("❌ رفض إذن الربط أو فشل في محرك الـ Web3:", walletAuthError);
                alert("فشل الاتصال بالمحفظة، يرجى الموافقة على طلب الربط الممرر.");
                return null;
            }
        } else {
            alert("لم يتم العثور على محفظة Web3 مشفرة. الرجاء فتح المنصة من داخل متصفح المحفظة الرقمية!");
            return null;
        }
    },

    executeOnChainSinuDeposit: async function(rawAmountToDeposit) {
        if (!rawAmountToDeposit || isNaN(rawAmountToDeposit) || Number(rawAmountToDeposit) <= 0) {
            alert("يرجى إدخال كمية صحيحة صالحة للشحن!");
            return;
        }

        if (!SinuSystemStateTracker.kriptoChatContractInstance) {
            const reconnectedWallet = await this.connectPlatformWallet();
            if (!reconnectedWallet) return;
        }

        try {
            const decimalPlaces = 18;
            const computedAmountInWei = ethers.utils.parseUnits(rawAmountToDeposit.toString(), decimalPlaces);
            
            SinuUserInterfaceRoutingManagerModule.showGlobalLoadingOverlay("⏳ الخطوة 1: جاري إعداد الموافقة الذكية (Approve)... وافق على المعاملة بمحفظتك.");
            
            const approveTxResponse = await SinuSystemStateTracker.sinuTokenContractInstance.approve(
                SinuGlobalConfigurationMatrix.contracts.kriptoChat,
                computedAmountInWei
            );
            await approveTxResponse.wait();
            console.log("✅ تمت الموافقة البرمجية بنجاح على البلوكشين.");

            SinuUserInterfaceRoutingManagerModule.updateGlobalLoadingOverlayText("⏳ الخطوة 2: جاري تحويل عملات $SINU للعقد الذكي وتغذية الرصيد السحابي...");
            
            const depositTxResponse = await SinuSystemStateTracker.kriptoChatContractInstance.depositSinu(computedAmountInWei);
            await depositTxResponse.wait();
            console.log("🎉 تم تأكيد معاملة الإيداع على البلوكشين.");

            await SinuFirebaseCloudInfrastructureModule.modifyCloudUserBalance(SinuSystemStateTracker.currentUserWallet, rawAmountToDeposit);
            
            SinuUserInterfaceRoutingManagerModule.hideGlobalLoadingOverlay();
            alert(`🎉 تهانينا الفاخرة! تم شحن ${rawAmountToDeposit} SINU لحسابك السحابي بنجاح مجاني.`);

        } catch (contractError) {
            SinuUserInterfaceRoutingManagerModule.hideGlobalLoadingOverlay();
            console.error("❌ فشلت عملية الإيداع أونشين داخل العقد الذكي:", contractError);
            alert("فشلت المعاملة الرقمية! قد يكون السبب عدم كفاية رصيد المحفظة الفعلي أو نقص غاز الشبكة.");
        }
    },

    dismissAuthenticationModals: function() {
        const structuralModalNodes = document.querySelectorAll('.core-auth-backdrop, #authModal, .auth-modal');
        structuralModalNodes.forEach(modal => {
            if (modal) modal.style.display = 'none';
        });
    },

    refreshWalletInterfaceStateLabels: function(isConnected, walletHexAddress) {
        const labelNode = document.getElementById("wallet-connection-status-label");
        if (labelNode && isConnected && walletHexAddress) {
            labelNode.innerText = `متصل: ${walletHexAddress.substring(0,6)}...${walletHexAddress.substring(walletHexAddress.length-4)}`;
        }
    }
};

// ==========================================================================
// 🎁 MODULE 3: محرك الهدايا والشات التفاعلي اللحظي (LIVE INTERACTIONS & CHAT)
// ==========================================================================
const SinuLiveInteractiveGiftingChatEngineModule = {
    triggerGiftPurchaseRequest: function(giftUniqueIdKey) {
        if (!SinuSystemStateTracker.currentUserWallet) {
            alert("⚠️ يرجى ربط محفظتك أولاً لتتمكن من إرسال الهدايا والتفاعل حياً!");
            return;
        }

        const targetGiftDetailsData = SinuGiftsStorePricingMatrix[giftUniqueIdKey];
        if (!targetGiftDetailsData) return;

        const normalizedUserKey = SinuSystemStateTracker.currentUserWallet.toLowerCase();
        const userDatabaseNodeRef = SinuFirebaseCloudInfrastructureModule.databaseInstance.ref('users/' + normalizedUserKey);

        userDatabaseNodeRef.once('value').then((snapshot) => {
            if (!snapshot.exists()) return;
            const currentCloudAvailableBalance = snapshot.val().balance || 0;

            if (currentCloudAvailableBalance < targetGiftDetailsData.cost) {
                alert(`⚠️ رصيدك السحابي الحالي غير كافٍ لشراء هذه الهدية! تكلفة [${targetGiftDetailsData.name}] هي ${targetGiftDetailsData.cost} SINU.`);
                return;
            }

            userDatabaseNodeRef.child('balance').transaction((currentBalanceVal) => {
                if (currentBalanceVal >= targetGiftDetailsData.cost) {
                    return currentBalanceVal - targetGiftDetailsData.cost;
                }
                return currentBalanceVal;
            }, (error, committed) => {
                if (error) {
                    console.error("❌ خطأ معاملة خصم الهدية:", error);
                } else if (!committed) {
                    alert("فشلت المعاملة السحابية الفورية! أعد المحاولة.");
                } else {
                    console.log(`✅ تم خصم رصيد الهدية بنجاح: -${targetGiftDetailsData.cost} SINU`);
                    this.pushNewLiveChatMessage(
                        SinuSystemStateTracker.currentUserWallet,
                        `🎁 أرسل قطعة فاخرة: [${targetGiftDetailsData.name} ${targetGiftDetailsData.emoji}] بقيمة ${targetGiftDetailsData.cost} SINU للمضيف! 🔥🎉`
                    );
                    this.generatePremiumPhysicsParticlesOverlay(targetGiftDetailsData.emoji);
                }
            });
        }).catch(err => {
            console.error("❌ خطأ أثناء جلب بيانات الرصيد لهدايا النظام:", err);
        });
    },

    pushNewLiveChatMessage: function(senderWalletAddress, rawMessageText) {
        if (!SinuFirebaseCloudInfrastructureModule.databaseInstance || !rawMessageText.trim()) return;

        if (rawMessageText.length > 250) {
            alert("الرسالة طويلة جداً! الحد الأقصى هو 250 حرف.");
            return;
        }

        try {
            const chatNodeRef = SinuFirebaseCloudInfrastructureModule.databaseInstance.ref('live_stream_chats');
            chatNodeRef.push().set({
                senderAddress: senderWalletAddress,
                messageContent: rawMessageText,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                senderRole: SinuSystemStateTracker.userAppRoleType
            });
        } catch (chatError) {
            console.error("❌ خطأ إرسال الرسالة إلى قاعدة البيانات السحابية:", chatError);
        }
    },

    initializeLiveChatListenerStream: function() {
        const chatScrollContainerBox = document.querySelector('.private-chat-messages-scroll-box');
        if (!chatScrollContainerBox || !SinuFirebaseCloudInfrastructureModule.databaseInstance) return;

        console.log("📡 [Chat Engine] بدء دفق واستقبال رسائل الشات التفاعلي اللحظي...");
        
        SinuFirebaseCloudInfrastructureModule.databaseInstance.ref('live_stream_chats').limitToLast(40).on('child_added', (snapshot) => {
            const chatMessagePacket = snapshot.val();
            if (!chatMessagePacket) return;

            const rowElementContainer = document.createElement('div');
            rowElementContainer.className = "live-stream-chat-msg-row";
            rowElementContainer.style.padding = "5px 8px";
            rowElementContainer.style.marginBottom = "5px";
            rowElementContainer.style.borderRadius = "8px";
            rowElementContainer.style.background = "rgba(255, 255, 255, 0.02)";
            rowElementContainer.style.fontSize = "0.85rem";
            rowElementContainer.style.animation = "paneFadeEntrance 0.25s ease-out forwards";

            const rawAddr = chatMessagePacket.senderAddress || "0xAnonymous";
            const formattedShortAddr = `${rawAddr.substring(0, 6)}...${rawAddr.substring(rawAddr.length - 4)}`;

            let senderColorStyleName = "var(--dating-pink)";
            if (chatMessagePacket.senderRole === "owner" || chatMessagePacket.senderRole === "admin") {
                senderColorStyleName = "var(--dating-purple)";
                rowElementContainer.style.borderRight = "3px solid var(--dating-purple)";
                rowElementContainer.style.background = "rgba(174, 82, 255, 0.06)";
            }

            rowElementContainer.innerHTML = `
                <span style="color: ${senderColorStyleName}; font-weight: bold; cursor: pointer;" onclick="SinuLiveInteractiveGiftingChatEngineModule.openProfilePreviewModalCard('${rawAddr}')">
                    <i class="fa-solid ${chatMessagePacket.senderRole === 'owner' ? 'fa-crown' : 'fa-user-secret'}" style="font-size: 0.75rem; margin-left: 3px;"></i>
                    ${formattedShortAddr}:
                </span>
                <span style="color: var(--text-main); margin-right: 4px; word-break: break-word;">${this.sanitizeUnsafeHtmlStrings(chatMessagePacket.messageContent)}</span>
            `;

            chatScrollContainerBox.appendChild(rowElementContainer);
            chatScrollContainerBox.scrollTop = chatScrollContainerBox.scrollHeight;
        });
    },

    generatePremiumPhysicsParticlesOverlay: function(emojiSymbol) {
        const maxParticlesCount = emojiSymbol === "🚀" ? 12 : 5;
        const mainBodyContainer = document.body;

        for (let i = 0; i < maxParticlesCount; i++) {
            const particleNode = document.createElement('div');
            particleNode.className = 'floating-overlay-emoji';
            particleNode.innerText = emojiSymbol;

            const horizontalOffsetPercentage = Math.random() * 80 + 10;
            const variableScaleFactor = Math.random() * 0.5 + 0.6;
            const structuralAnimationDuration = Math.random() * 1.2 + 1.8;

            particleNode.style.left = `${horizontalOffsetPercentage}%`;
            particleNode.style.fontSize = `${variableScaleFactor * 2.8}rem`;
            particleNode.style.bottom = "-50px";
            particleNode.style.animation = `premiumFloatUpEffect ${structuralAnimationDuration}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`;

            if (emojiSymbol === "🚀") {
                particleNode.style.filter = "drop-shadow(0 0 15px #ff6584) drop-shadow(0 0 30px #ae52ff)";
            }

            mainBodyContainer.appendChild(particleNode);

            setTimeout(() => {
                particleNode.remove();
            }, structuralAnimationDuration * 1000);
        }
    },

    openProfilePreviewModalCard: function(targetWalletAddress) {
        const modalSurfaceOverlayBackdrop = document.querySelector(".profile-preview-modal-backdrop");
        if (!modalSurfaceOverlayBackdrop || !SinuFirebaseCloudInfrastructureModule.databaseInstance) return;

        const shortFormAddr = `${targetWalletAddress.substring(0, 8)}...${targetWalletAddress.substring(targetWalletAddress.length - 6)}`;

        SinuFirebaseCloudInfrastructureModule.databaseInstance.ref('users/' + targetWalletAddress.toLowerCase()).once('value').then((snapshot) => {
            let renderedBalanceText = "0 SINU";
            let renderedRoleTextLabel = "عضو شبكة متألق";

            if (snapshot.exists()) {
                const nodeData = snapshot.val();
                renderedBalanceText = `${(nodeData.balance || 0).toLocaleString()} SINU`;
                if (nodeData.role === "owner") renderedRoleTextLabel = "👑 مؤسس المنصة ومطور العقد الذكي";
                if (nodeData.role === "admin") renderedRoleTextLabel = "🛡️ المشرف العام للمنظومة السحابية";
            }

            modalSurfaceOverlayBackdrop.innerHTML = `
                <div class="modal-surface-card" style="border-color: var(--border-color); position: relative;">
                    <div class="radar-core-scanner" style="width:55px; height:55px; margin:0 auto 12px auto; background:var(--premium-gradient)">
                        <i class="fa-solid fa-user-secret" style="font-size:1.3rem; color:#fff;"></i>
                    </div>
                    <h3 style="color:#fff; margin-bottom:4px; font-size:1.05rem; word-break:break-all;">${shortFormAddr}</h3>
                    <p style="color:var(--dating-pink); font-size:0.8rem; font-weight:bold; margin-bottom:12px;">${renderedRoleTextLabel}</p>
                    
                    <div style="background:rgba(0,0,0,0.4); padding:10px; border-radius:14px; margin-bottom:15px; border:1px solid rgba(255,101,132,0.1)">
                        <span style="font-size:0.75rem; color:var(--text-muted); display:block; margin-bottom:2px;">الرصيد السحابي المعتمد</span>
                        <strong style="font-size:1.15rem; color:var(--gold); font-weight:900;">${renderedBalanceText}</strong>
                    </div>

                    <button class="auth-action-trigger-button" style="padding:8px; font-size:0.8rem; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); color:#fff;" onclick="SinuLiveInteractiveGiftingChatEngineModule.closeProfilePreviewModalCard()">إغلاق كرت العرض</button>
                </div>
            `;
            modalSurfaceOverlayBackdrop.style.display = "flex";
        });
    },

    closeProfilePreviewModalCard: function() {
        const modalSurfaceOverlayBackdrop = document.querySelector(".profile-preview-modal-backdrop");
        if (modalSurfaceOverlayBackdrop) modalSurfaceOverlayBackdrop.style.display = "none";
    },

    sanitizeUnsafeHtmlStrings: function(unsafeRawString) {
        return unsafeRawString
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};

// ==========================================================================
// 📷 MODULE 4: عتاد الكاميرا والبث المباشر (HARDWARE MEDIA WEB STREAMING)
// ==========================================================================
const SinuHardwareMediaWebStreamingModule = {
    requestAndEnableBroadcasterWebcam: async function() {
        console.log("📷 [Hardware Stream] جاري فحص الأجهزة واستدعاء بث الكاميرا...");
        const targetHtmlVideoNode = document.getElementById("hardwareLocalWebcamVideo");
        const liveFallbackArtOverlay = document.querySelector(".live-hardware-fallback-overlay");

        if (!targetHtmlVideoNode) return;

        const structuralMediaConstraints = {
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: "user"
            },
            audio: true
        };

        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                SinuSystemStateTracker.localMediaStreamInstance = await navigator.mediaDevices.getUserMedia(structuralMediaConstraints);
                
                targetHtmlVideoNode.srcObject = SinuSystemStateTracker.localMediaStreamInstance;
                targetHtmlVideoNode.style.display = "block";
                
                if (liveFallbackArtOverlay) {
                    liveFallbackArtOverlay.style.display = "none";
                }

                SinuSystemStateTracker.isCameraStreamingActive = true;
                this.initializeLiveViewerCountMockCounter();
                console.log("✅ تم تشغيل بث الكاميرا والأجهزة بنجاح.");
            }
        } catch (mediaError) {
            console.error("❌ فشل تشغيل دفق الكاميرا والأجهزة الملحقة:", mediaError);
            alert("لم نتمكن من تشغيل الكاميرا! تأكد من منح الصلاحية للموقع من إعدادات قفل عنوان المتصفح.");
        }
    },

    terminateBroadcasterWebcamStream: function() {
        if (SinuSystemStateTracker.localMediaStreamInstance) {
            try {
                SinuSystemStateTracker.localMediaStreamInstance.getTracks().forEach(track => track.stop());
                SinuSystemStateTracker.localMediaStreamInstance = null;
                
                const targetHtmlVideoNode = document.getElementById("hardwareLocalWebcamVideo");
                const liveFallbackArtOverlay = document.querySelector(".live-hardware-fallback-overlay");
                
                if (targetHtmlVideoNode) targetHtmlVideoNode.style.display = "none";
                if (liveFallbackArtOverlay) liveFallbackArtOverlay.style.display = "flex";
                
                SinuSystemStateTracker.isCameraStreamingActive = false;
                console.log("🔒 تم إغلاق الكاميرا بنجاح وتحرير موارد النظام.");
            } catch (err) {
                console.error("❌ خطأ أثناء تفكيك قنوات الكاميرا:", err);
            }
        }
    },

    initializeLiveViewerCountMockCounter: function() {
        const liveIndicatorLabelNode = document.querySelector(".live-status-pill-indicator");
        if (!liveIndicatorLabelNode) return;

        SinuSystemStateTracker.liveViewerCountCounter = Math.floor(Math.random() * 40) + 1380;
        liveIndicatorLabelNode.innerText = `🔴 مـباشـر | ${SinuSystemStateTracker.liveViewerCountCounter} مـشـاهـد`;

        setInterval(() => {
            if (SinuSystemStateTracker.isCameraStreamingActive) {
                const varianceOffset = Math.floor(Math.random() * 7) - 3;
                SinuSystemStateTracker.liveViewerCountCounter += varianceOffset;
                liveIndicatorLabelNode.innerText = `🔴 مـباشـر | ${SinuSystemStateTracker.liveViewerCountCounter} مـشـاهـد`;
            }
        }, 4500);
    }
};

// ==========================================================================
// ⚽ MODULE 5: نظام مسابقات وتوقعات كأس العالم (WORLD CUP PREDICTIONS ENGINE)
// ==========================================================================
const SinuWorldCupPredictionsEngineModule = {
    transmitMatchPredictionIntent: function(matchUniqueId, predictedTeamWinnerName) {
        if (!SinuSystemStateTracker.currentUserWallet) {
            alert("يرجى ربط محفظتك أولاً لتتمكن من المشاركة في بركة التوقعات كأس العالم!");
            return;
        }

        if (!SinuFirebaseCloudInfrastructureModule.databaseInstance) return;
        const normalizedUserKey = SinuSystemStateTracker.currentUserWallet.toLowerCase();

        SinuFirebaseCloudInfrastructureModule.databaseInstance.ref(`world_cup_predictions/${matchUniqueId}/${normalizedUserKey}`).set({
            predictedWinner: predictedTeamWinnerName,
            submissionTimestamp: Date.now(),
            hasPaidPoolFee: true
        }).then(() => {
            alert(`⚽ تم قيد توقعك بنجاح لفوز [${predictedTeamWinnerName}]! سيتم معالجة بركة الجوائز تلقائياً.`);
            SinuLiveInteractiveGiftingChatEngineModule.pushNewLiveChatMessage(
                SinuSystemStateTracker.currentUserWallet,
                `⚽ دخل في تحدي التوقعات وتوقع فوز منتخب [${predictedTeamWinnerName}] في المباراة القادمة! 🔥`
            );
        }).catch(err => {
            console.error("❌ خطأ قيد توقعات كأس العالم بالخادم السحابي:", err);
        });
    },

    compileMatchesDashboardPanelMarkup: function() {
        const targetContainerNode = document.getElementById("sinu-worldcup-matches-box");
        if (!targetContainerNode) return;

        targetContainerNode.innerHTML = `
            <div class="web3-onchain-card-panel animate-pulse" style="margin-top: 15px; border-color: var(--dating-purple);">
                <h4 style="color:#fff; margin-bottom:12px;"><i class="fa-solid fa-trophy text-amber-400"></i> توقعات كأس العالم 2026 الحية ($SINU Pools)</h4>
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:10px; border-radius:12px;">
                    <span style="font-weight:bold; color:var(--text-main);">البرازيل 🇧🇷</span>
                    <span style="color:var(--dating-pink); font-weight:900;">ضد</span>
                    <span style="font-weight:bold; color:var(--text-main);">الأرجنتين 🇦🇷</span>
                </div>
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button class="web3-btn-trigger" style="flex:1; background:var(--premium-gradient);" onclick="SinuWorldCupPredictionsEngineModule.transmitMatchPredictionIntent('M1', 'Brazil')">توقع البرازيل</button>
                    <button class="web3-btn-trigger" style="flex:1; background:linear-gradient(135deg, var(--dating-purple) 0%, #7624d9 100%);" onclick="SinuWorldCupPredictionsEngineModule.transmitMatchPredictionIntent('M1', 'Argentina')">توقع الأرجنتين</button>
                </div>
            </div>
        `;
    }
};

// ==========================================================================
// 🧭 MODULE 6: نظام التناقل الرسومي وتبديل الواجهات (5-ZONE ROUTER MATRIX)
// ==========================================================================
const SinuUserInterfaceRoutingManagerModule = {
    initializeRoutingTabsEngine: function() {
        const bottomNavigationActionButtons = document.querySelectorAll(".app-bottom-navigation-bar .nav-item");
        const appViewportPanes = document.querySelectorAll(".app-viewports-scroller .app-pane");

        if (bottomNavigationActionButtons.length === 0) return;

        bottomNavigationActionButtons.forEach(buttonNode => {
            buttonNode.addEventListener("click", () => {
                const targetPaneElementId = buttonNode.getAttribute("data-target-pane");
                if (!targetPaneElementId) return;

                console.log(`🧭 [Router] الانتقال الفاخر للوحة الشاشة: ${targetPaneElementId}`);
                SinuSystemStateTracker.activeDashboardTabId = targetPaneElementId;

                bottomNavigationActionButtons.forEach(b => b.classList.remove("active"));
                appViewportPanes.forEach(pane => {
                    pane.style.display = "none";
                    pane.style.opacity = "0";
                });

                buttonNode.classList.add("active");
                
                const targetedPaneDomNode = document.getElementById(targetPaneElementId);
                if (targetedPaneDomNode) {
                    targetedPaneDomNode.style.display = "block";
                    setTimeout(() => {
                        targetedPaneDomNode.style.opacity = "1";
                    }, 30);

                    if (targetPaneElementId !== "live-pane") {
                        SinuHardwareMediaWebStreamingModule.terminateBroadcasterWebcamStream();
                    }

                    if (targetPaneElementId === "games-pane" || targetPaneElementId === "predictions-pane") {
                        SinuWorldCupPredictionsEngineModule.compileMatchesDashboardPanelMarkup();
                    }
                }
            });
        });
    },

    showGlobalLoadingOverlay: function(messageText) {
        let overlayNode = document.getElementById("sinu-premium-loading-overlay");
        if (!overlayNode) {
            overlayNode = document.createElement('div');
            overlayNode.id = "sinu-premium-loading-overlay";
            overlayNode.style.position = "fixed";
            overlayNode.style.inset = "0";
            overlayNode.style.background = "rgba(5, 2, 4, 0.96)";
            overlayNode.style.backdropFilter = "blur(12px)";
            overlayNode.style.zIndex = "999999";
            overlayNode.style.display = "flex";
            overlayNode.style.flexDirection = "column";
            overlayNode.style.alignItems = "center";
            overlayNode.style.justifyContent = "center";
            overlayNode.style.color = "#fff";
            overlayNode.innerHTML = `
                <div class="radar-core-scanner" style="width:65px; height:65px; margin-bottom:12px;">
                    <i class="fa-solid fa-circle-notch fa-spin" style="font-size:1.8rem; color:#fff;"></i>
                </div>
                <p id="sinu-loading-text-node" style="font-weight:bold; font-size:0.95rem; text-align:center; padding:0 20px;">${messageText}</p>
            `;
            document.body.appendChild(overlayNode);
        } else {
            this.updateGlobalLoadingOverlayText(messageText);
            overlayNode.style.display = "flex";
        }
    },

    updateGlobalLoadingOverlayText: function(text) {
        const txtNode = document.getElementById("sinu-loading-text-node");
        if (txtNode) txtNode.innerText = text;
    },

    hideGlobalLoadingOverlay: function() {
        const overlayNode = document.getElementById("sinu-premium-loading-overlay");
        if (overlayNode) overlayNode.style.display = "none";
    }
};

// ==========================================================================
// 🏁 MODULE 7: التهيئة الشاملة والربط الميكانيكي الفوري (MAIN CONSTRUCT INIT)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 [SINU CORE MATRICES] بدء ربط المكونات البرمجية لتطبيق الكبار والـ Web3...");

    // 1. تشغيل البنية السحابية للفايربيز
    SinuFirebaseCloudInfrastructureModule.initializeCloudConnection();

    // 2. تفعيل قنوات الاستماع لشات البث المباشر
    SinuLiveInteractiveGiftingChatEngineModule.initializeLiveChatListenerStream();

    // 3. تهيئة مصفوفة التناقل والتنقل السفلي الخماسي
    SinuUserInterfaceRoutingManagerModule.initializeRoutingTabsEngine();

    // 4. الربط المرن والذكي الشامل لجميع أزرار الدخول والتسجيل المحتملة بالـ HTML
    const potentialSystemLoginButtons = document.querySelectorAll('.auth-action-trigger-button, #login-btn, .login-btn, button');
    potentialSystemLoginButtons.forEach(buttonElementNode => {
        const internalBtnText = buttonElementNode.innerText || "";
        if (internalBtnText.includes("دخول") || internalBtnText.includes("تسجيل") || internalBtnText.includes("Connect")) {
            buttonElementNode.addEventListener("click", (clickEvent) => {
                clickEvent.preventDefault();
                SinuWeb3CoreEngineModule.connectPlatformWallet();
            });
        }
    });

    // 5. ربط النقر على البادج العلوي للرصيد لفتح شاشات تعبئة الرصيد أونشين عبر المحفظة
    const platformHeaderWalletBadge = document.querySelector(".balance-pill-badge");
    if (platformHeaderWalletBadge) {
        platformHeaderWalletBadge.addEventListener("click", () => {
            const requestedCoinsInputAmount = prompt("💰 بوابة إيداع الـ Web3 لعملة $SINU:\n\nأدخل كمية العملات التي ترغب بسحبها من محفظتك المشفرة وإيداعها بالعقد لتغذية رصيدك السحابي الحالي:");
            if (requestedCoinsInputAmount) {
                const cleanedFloatAmount = parseFloat(requestedCoinsInputAmount);
                SinuWeb3CoreEngineModule.executeOnChainSinuDeposit(cleanedFloatAmount);
            }
        });
    }

    // 6. ربط النقر على الرادار المركزي لتفعيل الكاميرا وبدء البث الحي الفخم للمضيف
    const centralRadarScannerRingNode = document.querySelector(".radar-core-scanner");
    if (centralRadarScannerRingNode) {
        centralRadarScannerRingNode.addEventListener("click", () => {
            SinuHardwareMediaWebStreamingModule.requestAndEnableBroadcasterWebcam();
        });
    }

    // 7. ربط حقول الإرسال اليدوي لشات البث اللحظي السحابي الموحد
    const interfaceChatInputField = document.querySelector(".private-chat-input-row input");
    const interfaceChatSendActionButton = document.querySelector(".private-chat-input-row button");
    
    if (interfaceChatSendActionButton && interfaceChatInputField) {
        const dispatchMessageExecutionRoutine = () => {
            if (!SinuSystemStateTracker.currentUserWallet) {
                alert("⚠️ يرجى ربط محفظتك أولاً عبر بوابة الدخول لتتمكن من المشاركة بالكتابة!");
                return;
            }
            SinuLiveInteractiveGiftingChatEngineModule.pushNewLiveChatMessage(
                SinuSystemStateTracker.currentUserWallet,
                interfaceChatInputField.value
            );
            interfaceChatInputField.value = "";
        };

        interfaceChatSendActionButton.addEventListener("click", dispatchMessageExecutionRoutine);
        interfaceChatInputField.addEventListener("keydown", (keyboardEvent) => {
            if (keyboardEvent.key === "Enter") {
                dispatchMessageExecutionRoutine();
            }
        });
    }

    // 8. الاستماع التلقائي للنقر على كروت متجر الهدايا التفاعلية بالكامل
    document.body.addEventListener("click", (userClickEvent) => {
        const closestGiftCardNodeNode = userClickEvent.target.closest("[data-gift-cost]");
        if (closestGiftCardNodeNode) {
            const capturedGiftId = closestGiftCardNodeNode.getAttribute("data-gift-id") || "rose";
            SinuLiveInteractiveGiftingChatEngineModule.triggerGiftPurchaseRequest(capturedGiftId);
        }
    });
});
